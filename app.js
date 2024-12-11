import { formulaDisplay, resultDisplay, currentDisplay } from "./display.js";

// 변수 선언들
const NUMBER_INPUT_REGEX = /^[0-9+\-*/.]$/;


const button = document.querySelector(".btn");
const display = document.querySelector(".display");
const num = document.querySelectorAll(".num");
console.log(num);
console.log(display);
const input = num[1].dataset.value; 
console.log(input);

// 리셋 함수 = AC 버튼 클릭 시 수식 및 값 초기화
const reset = () => {
    formulaDisplay = "";
    resultDisplay = "0";
    return currentDisplay(formulaDisplay, resultDisplay);
}

// 입력값 검증 함수 = 입력 값이 정규 표현식에 해당하는 내용일 경우 true, 아닐 경우 false 반환
const inputValidator = () => {
    if (NUMBER_INPUT_REGEX.test(formulaDisplay)) {
        return true;
    }
    return false;
}

// 버튼 클릭 이벤트
document.querySelector(".calculator").addEventListener("click", (event) => {
    const target = event.target.closet("[data-value]");
    if (!target) return;   
    input(target.dataset.value);
});

// 키보드 입력 이벤트
document.addEventListener("keydown", (event) => {

    // 버튼을 눌렀을 때, 입력 값을 정규 표현식으로 검증한 후 true일 경우 currentDisplay에 반영
    if (inputValidator) { 
        resultDisplay = input;
        currentDisplay(resultDisplay);
        console.log(resultDisplay);
    }

    // 입력 값이 = 일 경우, formulaDisplay에 반영한다.
    if (input === "=") {
        formulaDisplay = formulaDisplay + input;
        return currentDisplay(formulaDisplay);
    }

    // 수식을 계산한다. 어떨 경우에? (= 을 입력했을 때와 엔터를 입력했을 때)
    if (input === "=" || 엔터) {
        resultDisplay = eval(formulaDisplay);
    };

    //연산자&소수점 중복 입력이 아닐 경우 연산자&소수점 입력을 resulydisplay에 반영
    if (!/[+=*/.]/.test(resultDisplay)) {
        resultDisplay = input;
    }

    //연산자&소수점으로 끝날 때 = 입력을 막는다


    //소수점은 하나만 허용한다.

});