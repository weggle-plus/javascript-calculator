const row = document.querySelectorAll(".row");
const result = document.querySelector(".result");
const log = document.querySelector(".log");
const operator = ["%", "x", "-", "+"];
let equation = "";

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

  return number[0];
}

row.forEach(function (item) {
  item.addEventListener("click", function (event) {
    let currentValue = event.target.innerText;
    equation += currentValue;

    if (currentValue === "AC") {
      equation = "";
      result.innerText = "";
      log.innerText = "";
    } else if (currentValue === "=") {
      equation = equation.slice(0, -1);
      log.innerText = equation;
      result.innerText = calculate();
      equation = "";
    } else if (currentValue === "<") {
      equation = equation.slice(0, -2);
      result.innerText = equation;
    } else {
      result.innerText = equation;
    }
  });
});
