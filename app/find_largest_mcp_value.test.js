// app.test,js
import { describe, test, expect } from "@jest/globals";
import { find_largest_mcp_value } from "./app.js";

describe("find_largest_mcp_value", () => {
  test("Return height as the largest value", () => {
    // arrange
    const height_mcp = 0.5;
    const distance_mcp = 0.3;
    const frequency_mcp = 0.2;
    const force_mcp = 0.1;

    // act
    const result = find_largest_mcp_value(
      height_mcp,
      distance_mcp,
      frequency_mcp,
      force_mcp
    );

    // assert
    expect(result).toMatchObject({ name: "height", value: 0.5 });
  });
});
