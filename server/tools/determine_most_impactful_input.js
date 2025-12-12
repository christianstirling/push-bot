// server/tools/determine_most_impactful_input.js

import { round } from "../utils/round.js";
import { calculate_contribution_values } from "../utils/calculate_contribution_values.js";
import { calculate_mcp_values } from "../utils/calculate_mcp_values.js";
import { calculate_scale_factors } from "../utils/calculate_scale_factors.js";
import { determine_largest_mcp_value } from "../utils/determine_largest_mcp_value.js";

export function determine_most_impactful_input(
  vertical,
  distance_horizontal,
  frequency,
  force,
  action = "push"
) {
  const RL = 36.9;
  // const CV = 0.214;
  // const Z_25TH_PERCENTILE = -0.63;

  const { V_SF, DH_SF, F_SF } = calculate_scale_factors(
    vertical,
    distance_horizontal,
    frequency
  );

  // const max_acceptible_value = RL * V * DH * F;

  // const acceptible_force =
  //   max_acceptible_value + Z_25TH_PERCENTILE * max_acceptible_value * CV;

  const {
    vertical_contribution,
    distance_horizontal_contribution,
    frequency_contribution,
    force_contribution,
    sum_of_contributions,
  } = calculate_contribution_values(V_SF, DH_SF, F_SF, RL, force);

  const { vertical_mcp, distance_horizontal_mcp, frequency_mcp, force_mcp } =
    calculate_mcp_values(
      vertical_contribution,
      distance_horizontal_contribution,
      frequency_contribution,
      force_contribution,
      sum_of_contributions
    );

  const { name, value } = determine_largest_mcp_value(
    vertical_mcp,
    distance_horizontal_mcp,
    frequency_mcp,
    force_mcp
  );

  const RESULT = {
    name: name,
    value: value,
    description: `The most impactful task input for this job is ${name} with a metric contribution of ${round(
      value,
      2
    )}.`,
  };

  return RESULT;
}
