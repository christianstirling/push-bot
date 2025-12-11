// server/functions/chat.js
import { system_message } from "../prompts/system_message.js";
import { tools } from "../definitions/index.js";
import { handle_tool_calls } from "./handle_tool_calls.js";

const MODEL = "gpt-4.1-mini";

export async function chat({ message, history, client }) {
  if (!client) {
    throw new Error("chat requires a client (e.g openai)");
  }

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

    const tool_responses = await handle_tool_calls(tool_call_message);

    messages.push(tool_call_message);
    messages.push(...tool_responses);

    response = await client.chat.completions.create({
      model: MODEL,
      messages,
      tools,
    });
  }

  return response.choices[0].message.content;
}
