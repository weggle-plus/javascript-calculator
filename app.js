const row = document.querySelectorAll(".row");
const result = document.querySelector(".result");
const log = document.querySelector(".log");
const operator = ["%", "x", "-", "+"];
let equation = "5%55";

row.forEach(function (item) {
  item.addEventListener("click", function (event) {
    let currentValue = event.target.innerText;
    equation += currentValue;

    if (currentValue === "AC") {
      equation = "";
      result.innerText = "";
      log.innerText = "";
    } else if (currentValue === "=") {
      log.innerText = equation.slice(0, -1);
      result.innerText = "";
      equation = "";
    } else {
      result.innerText = equation;
    }
  });
});

function calculate() {
  // x, % 먼저 찾고 양 옆 숫자를 찾아 계산한다. -> 대체
  // 순차적으로 계산
  const number = equation.split(/[%x+-]/).map(Number);
  const oper = equation.split(/[0-9.]/).filter((item) => item);

  while (oper.includes("x") || oper.includes("%")) {
    console.log(number);
    console.log(oper);

    if (oper.includes("x")) {
      const index = oper.indexOf("x");

      number[index] = number[index] * number[index + 1];
      number.splice(index + 1, 1);
      oper.splice(index, 1);
    } else if (oper.includes("%")) {
      const index = oper.indexOf("%");

      number[index] = number[index] / number[index + 1];
      number.splice(index + 1, 1);
      oper.splice(index, 1);
    }
  }
  // 5 % 55 * 2 안됨.
  // +, - 구현 필요
  console.log(number);
  console.log(oper);
}

calculate();
