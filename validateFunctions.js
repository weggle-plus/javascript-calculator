const operator = ["%", "x", "-", "+", "/", "*"];

export function validateRepeatOper(equation) {
    const prev = equation.at(-2);
    if (operator.includes(prev)) {
      equation = equation.slice(0, -1);
    }
    return equation
  }
  
export function validateDot(equation, hasDot) {
    if (!hasDot) {
      hasDot = true;
    } else {
      equation = equation.slice(0, -1);
    }
    return {equation, hasDot}
  }
  
export  function validateZero(equation) {
    const prev = equation.at(-3);
    if (equation.length === 2 && equation.at(0) === "0") {
      equation = equation.slice(0, -1);
    } else if (operator.includes(prev) && equation.at(-2) === "0") {
      equation = equation.slice(0, -1);
    }
    return equation
  }