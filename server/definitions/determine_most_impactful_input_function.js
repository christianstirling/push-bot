// server/definitions/determine_most_impactful_input_function.js

// Turn the calculate_mcp function into a tool
export const determine_most_impactful_input_function = {
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
