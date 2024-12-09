import { handleInput } from "./calculateFunctions.js";

const items = document.querySelectorAll(".item");
const operator = ["%", "x", "-", "+", "/", "*"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

items.forEach(function (item) {
  item.addEventListener("click", function (event) {
    let currentValue = event.target.innerText;

    handleInput(currentValue);
  });
});

window.addEventListener("keydown", (e) => {
  const key = e.key;

  if (operator.includes(key) || numbers.includes(key)) {
    handleInput(e.key);
  } else if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("<");
  }
});
