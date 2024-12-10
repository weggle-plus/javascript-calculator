import { calculate } from "./calculateFunctions";

describe("사칙연산 우선순위 test", () => {
  test("2+3x4/2은 8이다.", () => {
    //given
    const expression = "2+3x4/2";

    //when
    const result = calculate(expression);

    //then
    expect(result.toString()).toBe("8");
  });
});
