const row = document.querySelectorAll(".row");
const result = document.querySelector(".result");
const log = document.querySelector(".log");
const operator = ["%", "x", "-", "+", "/", "*"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let equation = "";
let hasDot = false;

function calculate() {
  // x, % 먼저 찾고 양 옆 숫자를 찾아 계산한다. -> 대체
  // 순차적으로 계산
  const number = equation.split(/[%x+*\/-]/).map(Number);
  const oper = equation.split(/[0-9.]/).filter((item) => item);

  let operIdx = 0;
  while (operIdx < oper.length) {
    if (oper[operIdx] == "x" || oper[operIdx] == "*") {
      number[operIdx] = number[operIdx] * number[operIdx + 1];
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
      continue;
    } else if (oper[operIdx] == "%" || oper[operIdx] == "/") {
      number[operIdx] = number[operIdx] / number[operIdx + 1];
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
      continue;
    }
    operIdx++;
  }

  operIdx = 0;
  while (oper.length > 0) {
    if (oper[operIdx] == "+") {
      number[operIdx] = number[operIdx] + number[operIdx + 1];
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
    } else if (oper[operIdx] == "-") {
      number[operIdx] = number[operIdx] - number[operIdx + 1];
      number.splice(operIdx + 1, 1);
      oper.splice(operIdx, 1);
    }
  }
  equation = number[0];
  return number[0];
}

function validateRepeatOper() {
  const prev = equation.at(-2);
  if (operator.includes(prev)) {
    equation = equation.slice(0, -1);
  }
}

function validateDot() {
  if (!hasDot) {
    hasDot = true;
  } else {
    equation = equation.slice(0, -1);
  }
}

function validateException(currentValue) {
  equation += currentValue;

  if (currentValue === "AC") {
    equation = "";
    result.innerText = "";
    log.innerText = "";
    hasDot = false;
  } else if (operator.includes(currentValue)) {
    hasDot = false;
    validateRepeatOper();
    if (equation.length === 1) {
      equation = "0" + equation;
    }
  } else if (currentValue === ".") {
    validateDot();
  } else if (currentValue === "=") {
    equation = equation.slice(0, -1);
    log.innerText = equation;
    calculate();
    hasDot = false;
  } else if (currentValue === "<") {
    if (equation.at(-2) === ".") {
      hasDot = false;
    }
    equation = equation.slice(0, -2);
  } else if (currentValue === "0") {
    validateZero();
  }

  result.innerText = equation;
}

function validateZero() {
  const prev = equation.at(-3);
  if (equation.length === 2 && equation.at(0) === "0") {
    equation = equation.slice(0, -1);
  } else if (operator.includes(prev) && equation.at(-2) === "0") {
    equation = equation.slice(0, -1);
  }
}

row.forEach(function (item) {
  item.addEventListener("click", function (event) {
    let currentValue = event.target.innerText;

    validateException(currentValue);
  });
});

window.addEventListener("keydown", (e) => {
  const key = e.key;

  if (operator.includes(key) || numbers.includes(key)) {
    validateException(e.key);
  } else if (key === "Enter") {
    e.preventDefault();
    validateException("=");
  } else if (key === "Backspace") {
    validateException("<");
  }
});
