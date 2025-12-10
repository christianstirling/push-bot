// server/functions/calculate_mcp_values.js

export function calculate_mcp_values(
  vertical_contribution,
  distance_horizontal_contribution,
  frequency_contribution,
  force_contribution,
  sum_of_contributions
) {
  const vertical_mcp = vertical_contribution / sum_of_contributions;
  const distance_horizontal_mcp =
    distance_horizontal_contribution / sum_of_contributions;
  const frequency_mcp = frequency_contribution / sum_of_contributions;
  const force_mcp = force_contribution / sum_of_contributions;

  return { vertical_mcp, distance_horizontal_mcp, frequency_mcp, force_mcp };
}
