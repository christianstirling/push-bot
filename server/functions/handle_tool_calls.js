// server/functions/handle_tool_calls.js

import { determine_most_impactful_input } from "../tools/determine_most_impactful_input.js";

export function handle_tool_calls(message) {
  const responses = [];

  for (const tool_call of message.tool_calls) {
    const TOOL_NAME = tool_call.function?.name;
    if (TOOL_NAME === "determine_most_impactful_input") {
      let args;

      try {
        args = JSON.parse(tool_call.function.arguments || "{}");
      } catch (error) {
        responses.push({
          role: "tool",
          tool_call_id: tool_call.id,
          content: `Invalid JSON for determine_most_impactful_input args: ${args}`,
        });
        continue;
      }

      const { height, distance, frequency, force, action } = args;

      let analysis_results = determine_most_impactful_input(
        height,
        distance,
        frequency,
        force,
        action
      );

      console.log(analysis_results);

      responses.push({
        role: "tool",
        tool_call_id: tool_call.id,
        content: JSON.stringify(analysis_results),
      });
    } else {
      responses.push({
        role: "tool",
        tool_call_id: tool_call.id,
        content: `Invalid tool call name: ${TOOL_NAME}`,
      });
    }
  }

  return responses;
}
