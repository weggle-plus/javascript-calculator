const { calculateExpression } = require("../app");

describe("calculateExpression", () => {
  it("사칙연산 시 우선순위가 보장된다.", () => {
    const expression = "2+3x4/2";

    const result = calculateExpression(expression);

    expect(result).toBe(8);
  });
});
