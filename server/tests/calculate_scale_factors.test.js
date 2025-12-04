import { calculate_scale_factors } from "../functions/calculate_scale_factors";
import { describe, test, expect } from "@jest/globals";

describe("calculate_scale_factors", () => {
  test("returns correct scale factors for nominal input set", () => {
    const V = 1.5;
    const DH = 30;
    const F = 2;

    const { V_SF, DH_SF, F_SF } = calculate_scale_factors(V, DH, F);

    const expected_V_SF = 0.67876;
    const expected_DH_SF = 0.705208;
    const expected_F_SF = 0.670114;

    expect(V_SF).toBeCloseTo(expected_V_SF, 5);
    expect(DH_SF).toBeCloseTo(expected_DH_SF, 5);
    expect(F_SF).toBeCloseTo(expected_F_SF, 5);
  });
});
