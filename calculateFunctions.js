import { validateRepeatOper, validateDot, validateZero } from "./validateFunctions.js";
import Decimal from "./node_modules/decimal.js/decimal.mjs";

const result = document.querySelector(".result");
const log = document.querySelector(".log");
const operator = ["%", "÷", "x", "×", "-", "+", "/", "*"];
let equation = "";
let hasDot = false;

export function calculate(equation) {
  // x, % 먼저 찾고 양 옆 숫자를 찾아 계산한다. -> 대체
  // 순차적으로 계산
  const number = equation.split(/[%÷x×+*\/-]/).map(Number);
  const oper = equation.split(/[0-9.]/).filter((item) => item);
  let operIdx = 0;
  while (operIdx < oper.length) {
    if (oper[operIdx] == "x" || oper[operIdx] == "*" || oper[operIdx] == "×") {
      number[operIdx] = new Decimal(number[operIdx]).times(new Decimal(number[operIdx + 1]));
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
      continue;
    } else if (oper[operIdx] == "%" || oper[operIdx] == "/" || oper[operIdx] == "÷") {
      number[operIdx] = new Decimal(number[operIdx]).dividedBy(new Decimal(number[operIdx + 1]));
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
      continue;
    }
    operIdx++;
  }

  operIdx = 0;
  while (oper.length > 0) {
    if (oper[operIdx] == "+") {
      number[operIdx] = new Decimal(number[operIdx]).plus(new Decimal(number[operIdx + 1]));
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
    } else if (oper[operIdx] == "-") {
      number[operIdx] = new Decimal(number[operIdx]).minus(new Decimal(number[operIdx + 1]));
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
    }
  }

  return number[0].toString();
}

export function handleInput(currentValue) {
  equation += currentValue;

  if (currentValue === "AC") {
    equation = "";
    result.innerText = "";
    log.innerText = "";
    hasDot = false;
  } else if (operator.includes(currentValue)) {
    hasDot = false;
    equation = validateRepeatOper(equation);
    if (equation.length === 1) {
      equation = "0" + equation;
    }
  } else if (currentValue === ".") {
    const res = validateDot(equation, hasDot);
    equation = res.equation;
    hasDot = res.hasDot;
  } else if (currentValue === "=") {
    equation = equation.slice(0, -1);
    log.innerText = addCommaFunction(equation);
    equation = calculate(equation);
    hasDot = false;
  } else if (currentValue === "<") {
    if (equation.at(-2) === ".") {
      hasDot = false;
    }
    equation = equation.slice(0, -2);
  } else if (currentValue === "0") {
    equation = validateZero(equation);
  }

  result.innerText = addCommaFunction(equation);
}

function addCommaFunction(str) {
  const strArr = str.split(/([%÷x×+*\/-])/);
  let result = strArr
    .map((item) => {
      if (item === "") return;
      if (!isNaN(item) && !operator.includes(item)) {
        const [integerPart, decimalPart] = item.split(".");
        const formattedInteger = Number(integerPart).toLocaleString();
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
      } else {
        return item;
      }
    })
    .join("");

  return result;
}
