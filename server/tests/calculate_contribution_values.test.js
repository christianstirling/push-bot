import { calculate_contribution_values } from "../functions/calculate_contribution_values";
import { describe, test, expect } from "@jest/globals";

describe("calculate_contribution_values", () => {
  test("returns correct contribution values for given set of scale factors", () => {
    const V_SF = 0.67876;
    const DH_SF = 0.705208;
    const F_SF = 0.670114;
    const RL = 36.9;
    const force = 50;

    const {
      vertical_contribution,
      distance_horizontal_contribution,
      frequency_contribution,
      force_contribution,
      sum_of_contributions,
    } = calculate_contribution_values(V_SF, DH_SF, F_SF, RL, force);

    const expected_vertical_contribution = 0.32124;
    const expected_distance_horizontal_contribution = 0.294792;
    const expected_frequency_contribution = 0.329886;
    const expected_force_contribution = 0.355013;
    const expected_sum_of_contributions =
      expected_vertical_contribution +
      expected_distance_horizontal_contribution +
      expected_frequency_contribution +
      expected_force_contribution;

    expect(vertical_contribution).toBeCloseTo(
      expected_vertical_contribution,
      5
    );
    expect(distance_horizontal_contribution).toBeCloseTo(
      expected_distance_horizontal_contribution,
      5
    );
    expect(frequency_contribution).toBeCloseTo(
      expected_frequency_contribution,
      5
    );
    expect(force_contribution).toBeCloseTo(expected_force_contribution, 5);
    expect(sum_of_contributions).toBeCloseTo(expected_sum_of_contributions, 5);
  });
});
