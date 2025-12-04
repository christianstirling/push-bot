// server/definitions/index.js

import { determine_most_impactful_input_function } from "./determine_most_impactful_input_function.js";

export const tools = [
  { type: "function", function: determine_most_impactful_input_function },
];
