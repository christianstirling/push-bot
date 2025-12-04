export function calculate_contribution_values(V_SF, DH_SF, F_SF, RL, force) {
  const vertical_contribution = 1 - V_SF;
  const distance_hortizontal_contribution = 1 - DH_SF;
  const frequency_contribution = 1 - F_SF;
  const force_contribution = force - RL > 0 ? (force - RL) / RL : 0;

  const sum_of_contributions =
    height_contribution +
    distance_contribution +
    frequency_contribution +
    force_contribution;

  return {
    vertical_contribution,
    distance_hortizontal_contribution,
    frequency_contribution,
    force_contribution,
    sum_of_contributions,
  };
}
