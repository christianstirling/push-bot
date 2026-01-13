// server/functions/chat.js

//new
import { ChatOpenAI } from "@langchain/openai";

import { system_message } from "../prompts/system_message.js";
import { tools } from "../definitions/langIndex.js";
import { handle_tool_calls } from "./handle_tool_calls.js";

export async function chat({ message, history, model: modelWithTools }) {
  if (!modelWithTools) {
    throw new Error("chat requires a model and an api key");
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

  let response = await modelWithTools.invoke(messages);

  console.log(response);

  while (response.response_metadata.finish_reason === "tool_calls") {
    const tool_call_message = response.tool_calls;

    const tool_responses = handle_tool_calls(tool_call_message);
    RESULT.toolResult = tool_responses[0].metadata;

    console.log("---\ntool response:\n--");
    console.log(tool_responses);

    messages.push(tool_call_message);
    messages.push(...tool_responses);

    let response = await modelWithTools.invoke(messages);

    console.log("---\nopenai response message:\n---");
    console.log(response.content);

    RESULT.toolCompleted = true;
  }

  RESULT.assistantContent = response.content;

  console.log("---\nresult object in chat function\n---");
  console.log(RESULT);

  return RESULT;
}
