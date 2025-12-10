import { round } from "../functions/round";
import { describe, test, expect } from "@jest/globals";

describe("round", () => {
  test("Return number rounded to given decimal", () => {
    // arrange
    const number = 2.22222222;
    const decimal = 2;

    // act
    const result = round(number, decimal);

    // assert
    expect(result).toBe(2.22);
  });
});
