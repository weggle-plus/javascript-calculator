import { formulaDisplay, resultDisplay, currentDisplay } from ".display.js";
import { NUMBER_INPUT_REGEX } from ".constant.js";

const button = document.querySelector("/.calculator.btn");
const display = document.querySelector("/.calculator.display");
const input = num.dataset.value; 

const inputValidator = () => {

    if (NUMBER_INPUT_REGEX.test(formulaDisplay)) {
        return true;
    }
    return false;
}

export const handleButtonClick = () => {
    
    // 버튼을 눌렀을 때, 입력 값을 정규 표현식으로 검증한 후 true일 경우 currentDisplay에 반영
    if(inputValidator) { 
        resultDisplay = input;
        currentDisplay(resultDisplay);
    }

    // 입력 값이 = 일 경우, formulaDisplay에 반영한다.
    if(input === "=") {
        formulaDisplay = formulaDisplay + input;
        currentDisplay(formulaDisplay);
    }
}

input.addEventListener(Click, handleButtonClick)