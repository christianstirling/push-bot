// server/definitions/index.js

// import { determine_most_impactful_input_function } from "./determine_most_impactful_input_function.js";
import { determine_most_impactful_input } from "../tools/determine_most_impactful_input.js";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const determineMostImpactfulInputSchema = z
  .object({
    vertical: z
      .number()
      .describe("The height of the worker's hand above the ground, in meters."),
    distance_horizontal: z
      .number()
      .describe(
        "The distance that the object being acted upon is moved horizontally, in meters."
      ),
    frequency: z
      .number()
      .describe(
        "The number of times that this specific task is performed, per minute"
      ),
    force: z
      .number()
      .describe("The force needed to initiate the movement of the object"),
    action: z
      .enum(["push", "pull"])
      .describe(
        "The type of action being performed, either a 'push' action or a 'pull' action."
      ),
  })
  .strict();

export const determineMostImpactfulInputTool = tool(
  determine_most_impactful_input,
  {
    name: "determine_most_impactful_input",
    description:
      "Take a single worker's task, where the action being performed is either pushing or pulling an object horizontally, and determine the input variable with the greatest impact on worker fatigue within the given task.",
    schema: determineMostImpactfulInputSchema,
  }
);

const determine_most_impactful_input_function = {
  name: "determine_most_impactful_input",
  description:
    "Take a single worker's task, where the action being performed is either pushing or pulling an object horizontally, and determine the input variable with the greatest impact on worker fatigue within the given task.",
  parameters: {
    type: "object",
    properties: {
      vertical: {
        type: "number",
        description:
          "The height of the worker's hand above the ground, in meters.",
      },
      distance_horizontal: {
        type: "number",
        description:
          "The distance that the object being acted upon is moved horizontally, in meters.",
      },
      frequency: {
        type: "number",
        description:
          "The number of times that this specific task is performed, per minute",
      },
      force: {
        type: "number",
        description: "The force needed to initiate the movement of the object",
      },
      action: {
        type: "string",
        description:
          "The type of action being performed, either a 'push' action or a 'pull' action.",
      },
    },
    required: ["vertical", "distance_horizontal", "frequency", "force"],
    additionalProperties: false,
  },
};

export const tools = [determineMostImpactfulInputTool];
