const row = document.querySelectorAll(".row");
const result = document.querySelector(".result");
const log = document.querySelector(".log");
const operator = ["<", "%", "x", "-", "+", ".", "="];
let equation = "";

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
