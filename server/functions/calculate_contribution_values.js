export function calculate_contribution_values(V_SF, DH_SF, F_SF, RL, force) {
  const vertical_contribution = 1 - V_SF;
  const distance_horizontal_contribution = 1 - DH_SF;
  const frequency_contribution = 1 - F_SF;
  const force_contribution = force - RL > 0 ? (force - RL) / RL : 0;
  // console.log(force_contribution)

  const sum_of_contributions =
    vertical_contribution +
    distance_horizontal_contribution +
    frequency_contribution +
    force_contribution;

  return {
    vertical_contribution,
    distance_horizontal_contribution,
    frequency_contribution,
    force_contribution,
    sum_of_contributions,
  };
}
