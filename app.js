const expressionElement = document.querySelector(".calculation");
const resultElement = document.querySelector(".result");
const buttons = document.querySelectorAll(".button");

let userExpression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.innerText));
});

document.addEventListener("keydown", (event) => handleKeyPress(event.key));

function handleKeyPress(key) {
  const keys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "/",
    "*",
    "=",
    "Escape",
    "Enter",
    "Backspace",
  ];
  if (keys.includes(key) || key === "Enter" || key === "Backspace") {
    if (key === "Escape") {
      resetCalculator();
    } else if (key === "Enter") {
      try {
        const result = calculateExpression(userExpression);
        expressionElement.innerText = userExpression;
        resultElement.innerText = result;
      } catch (err) {
        alert(err, "올바르지 않은 표현식 입니다.");
        userExpression = "";
      }
    } else if (key === "Backspace") {
      backSpace();
    } else {
      if (key === "*") {
        key = "x";
      }
      userExpression += key;
      expressionElement.innerText = userExpression;
    }
  }
}
function handleButtonClick(value) {
  if (value === "AC") {
    resetCalculator();
  } else if (value === "=") {
    try {
      const result = calculateExpression(userExpression);
      expressionElement.innerText = userExpression;
      resultElement.innerText = result;
    } catch (err) {
      alert(err, "올바르지 않은 표현식 입니다.");
      userExpression = "";
    }
  } else if (value === "<") {
    backSpace();
  } else {
    if (value === "*") value = "x";
    userExpression += value;
    expressionElement.innerText = userExpression;
  }
}

function resetCalculator() {
  userExpression = "";
  expressionElement.innerText = "";
  resultElement.innerText = "0";
}

function backSpace() {
  if (resultElement.innerText && userExpression === "") {
    userExpression = resultElement.innerText;
    resultElement.innerText = "";
  }
  userExpression = userExpression.slice(0, -1);
  expressionElement.innerText = userExpression;
}

function calculateExpression(expression) {
  const operators = expression.match(/[+\-x//]/g);
  const operands = expression.split(/[+\-x//]/).map(Number);

  if (!operators || !operands || operands.length < 2) {
    alert("올바르지 않은 표현식 입니다.");
  }
  return priorityExpression(operators, operands, "first");
}

function priorityExpression(operators, operands, stage) {
  switch (stage) {
    case "first":
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "x" || operators[i] === "/") {
          const result =
            operators[i] === "x"
              ? operands[i] * operands[i + 1]
              : operands[i] / operands[i + 1];
          operands.splice(i, 2, result);
          operators.splice(i, 1);
          return priorityExpression(operators, operands, "first");
        }
      }
      return priorityExpression(operators, operands, "second");

    case "second":
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+" || operators[i] === "-") {
          const result =
            operators[i] === "+"
              ? operands[i] + operands[i + 1]
              : operands[i] - operands[i + 1];
          operands.splice(i, 2, result);
          operators.splice(i, 1);
          return priorityExpression(operators, operands, "second");
        }
      }
      return operands[0];
  }
}

resetCalculator();

module.exports = { calculateExpression, priorityExpression };
