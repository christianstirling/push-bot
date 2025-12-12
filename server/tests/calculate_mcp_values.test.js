import { calculate_mcp_values } from "../utils/calculate_mcp_values";
import { describe, test, expect } from "@jest/globals";

describe("calculate_mcp_values", () => {
  test("returns correct mcp values for given set of contribution values", () => {
    const vertical_contribution = 0.32124;
    const distance_horizontal_contribution = 0.294792;
    const frequency_contribution = 0.329886;
    const force_contribution = 0.355013;
    const sum_of_contributions = 1.300931;

    const { vertical_mcp, distance_horizontal_mcp, frequency_mcp, force_mcp } =
      calculate_mcp_values(
        vertical_contribution,
        distance_horizontal_contribution,
        frequency_contribution,
        force_contribution,
        sum_of_contributions
      );

    const expected_vertical_mcp = 0.24693;
    const expected_distance_horizontal_mcp = 0.2266;
    const expected_frequency_mcp = 0.253576;
    const expected_force_mcp = 0.272891;

    expect(vertical_mcp).toBeCloseTo(expected_vertical_mcp, 5);
    expect(distance_horizontal_mcp).toBeCloseTo(
      expected_distance_horizontal_mcp,
      5
    );
    expect(frequency_mcp).toBeCloseTo(expected_frequency_mcp, 5);
    expect(force_mcp).toBeCloseTo(expected_force_mcp, 5);
  });
});
