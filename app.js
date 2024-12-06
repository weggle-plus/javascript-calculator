const expressionElement = document.querySelector(".calculation");
const resultElement = document.querySelector(".result");
const buttons = document.querySelectorAll(".button");

let userExpression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.innerText));
});

//버튼 클릭
function handleButtonClick(value) {
  if (value === "AC") {
    resetCalculator();
  } else if (value === "=") {
    // 계산 보여주기
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
    userExpression += value;
    expressionElement.innerText = userExpression;
  }
}

//계산기 초기화
function resetCalculator() {
  userExpression = "";
  expressionElement.innerText = "";
  resultElement.innerText = "0";
}

// 수식 계산
function calculateExpression(expression) {
  const operators = expression.match(/[+\-x/÷]/g);
  const operands = expression.split(/[+\-x/÷]/).map(Number);
  console.log(operands);
  console.log(operators);

  if (!operators || !operands || operands.length < 2) {
    alert("올바르지 않은 표현식 입니다.");
  }
  return priorityExpression(operators, operands, "first");
}

// 수식 우선순위
function priorityExpression(operators, operands, stage) {
  switch (stage) {
    case "first":
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "x" || operators[i] === "÷") {
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

//한칸 뒤로가기
function backSpace() {
  if (resultElement.innerText && userExpression === "") {
    userExpression = resultElement.innerText;
    resultElement.innerText = "";
  }
  userExpression = userExpression.slice(0, -1);
  expressionElement.innerText = userExpression;
}
resetCalculator();
