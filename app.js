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
      expressionElement.innerText = result;
      userExpression = result.toString();
    } catch (err) {
      expressionElement.innerText = "에러";
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

// 수식 초기화
//수식 업데이트

// 수식 계산

// 수식 우선순위

//한칸 뒤로가기
function backSpace() {
  userExpression = userExpression.slice(0, -1);
  expressionElement.innerText = userExpression;
}
resetCalculator();
