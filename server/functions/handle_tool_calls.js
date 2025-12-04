// server/functions/handle_tool_calls.js

import { determine_most_impactful_input } from "../tools/determine_most_impactful_input.js";

export function handle_tool_calls(message) {
  const responses = [];

  for (const tool_call of message.tool_calls ?? []) {
    if (tool_call.function?.name === "calculate_mcp") {
      const raw_args = JSON.parse(tool_call.function.arguments || "{}");

      let args;

      try {
        args = JSON.parse(raw_args);
      } catch (error) {
        responses.push({
          role: "tool",
          tool_call_id: tool_call.id,
          content: `Invalid JSON for calculate_mcp args: ${raw_args}`,
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

      responses.push({
        role: "tool",
        tool_call_id: tool_call.id,

        content:
          typeof analysis_results === "string"
            ? analysis_results
            : JSON.stringify(analysis_results),
      });
    }
  }

  return responses;
}
