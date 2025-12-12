// server/functions/chat.js
import { system_message } from "../prompts/system_message.js";
import { tools } from "../definitions/index.js";
import { handle_tool_calls } from "./handle_tool_calls.js";

const MODEL = "gpt-4.1-mini";

export async function chat({ message, history, client }) {
  if (!client) {
    throw new Error("chat requires a client (e.g openai)");
  }

  const RESULT = { assistantContent: "", toolCompleted: false, toolResult: {} };

  const normalized_history = (history || []).map((h) => ({
    role: h.role,
    content: h.content,
  }));

  let messages = [
    { role: "system", content: system_message },
    ...normalized_history,
    { role: "user", content: message },
  ];

  let response = await client.chat.completions.create({
    model: MODEL,
    messages,
    tools,
  });

  while (response.choices[0].finish_reason === "tool_calls") {
    const tool_call_message = response.choices[0].message;

    console.log("---\ntool call message:\n--");
    console.log(tool_call_message);

    const tool_responses = handle_tool_calls(tool_call_message);
    RESULT.toolResult = tool_responses[0].metadata;

    console.log("---\ntool response:\n--");
    console.log(tool_responses);

    messages.push(tool_call_message);
    messages.push(...tool_responses);

    response = await client.chat.completions.create({
      model: MODEL,
      messages,
      tools,
    });

    console.log("---\nopenai response message:\n---");
    console.log(response.choices[0].message);

    RESULT.toolCompleted = true;
  }

  RESULT.assistantContent = response.choices[0].message.content;

  console.log("---\nresult object in chat function\n---");
  console.log(RESULT);

  return RESULT;
}
