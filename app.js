import { currentDisplay } from "./display.js";

// 변수 선언들
const NUMBER_INPUT_REGEX = /^[0-9+\-*/.]$/;

let formulaDisplay = "0";
let resultDisplay = "0";

// 리셋 함수 = AC 버튼 클릭 시 수식 및 값 초기화
let reset = () => {
    formulaDisplay = "0";
    resultDisplay = "0";
    console.log(resultDisplay);
    return currentDisplay(formulaDisplay, resultDisplay);
}

// 버튼 클릭 이벤트

document.querySelector(".calculator").addEventListener("click", (event) => {

    const target = event.target.closest("[data-value]");
    console.log(target);
    if (!target) return;   
    console.log(resultDisplay.length);
    input(target.dataset.value);
});


// display 수식&결과 값 길이 제한
// function notLength() {

//     if (formulaDisplay.length > 12 || resultDisplay.length > 12) {
//         return false;
//     } else return true;
// }

// 버튼별로 동작 구현
function input(value) {


    // =을 눌렀을 때, 수식값(formulaDisplay)이 사칙연산으로 끝났다면
    // 수식값= "수식값+결과값="을 해주고
    // 결과값 = eval(수식값)을 하여 연산 결과를 반영하여 return;
    if (value === "=") {

        // 사칙연산으로 끝났을 때
        if (/[+\-*/]$/.test(formulaDisplay)) {
            formulaDisplay = formulaDisplay + resultDisplay;
            resultDisplay = eval(formulaDisplay);
            currentDisplay(formulaDisplay, resultDisplay);
            resultDisplay = "0";
            return;
        }

    }

    // < 버튼을 눌렀을 경우, 결과값을 0이 될때까지 오른쪽부터 하나씩 지운다.
    if (value === "back" && resultDisplay !== "0") {
        resultDisplay = resultDisplay.slice(0, -1);
        currentDisplay(formulaDisplay, resultDisplay);
        return;
    }

    // AC 버튼을 눌렀을 경우, display를 clear해준다.
    if (value === "clear") {
        reset();
        return;
    }

    // 0~9까지 버튼을 누르면, 결과값(resultDisplay)에 반영해서 출력
    if (/^[0-9]$/.test(value)) {
        if (resultDisplay === "0") {
            resultDisplay = value;

            if (formulaDisplay === "0") {
                formulaDisplay = value
            } else if (!/[+\-*/]$/.test(formulaDisplay)) {
                formulaDisplay = formulaDisplay + value;
            }
        } else {

            resultDisplay = resultDisplay + value;

            if (formulaDisplay === "0") {
                formulaDisplay = resultDisplay;
            } else {
                if (!/[+\-*/]$/.test(formulaDisplay)) {
                    formulaDisplay = formulaDisplay + value;
                }
            }
            // 수식값이 0이 아닐 때, 수식값이 사칙연산으로 끝나지 않을 때
            // 수식값 = 수식값 + value(현재 입력값)이다.
        }
        currentDisplay(formulaDisplay, resultDisplay);
        return;
    }

    // 사칙연산 버튼을 누르면, 수식값(formulaDisplay)에 해당 사칙연산을 추가해서 출력
    if (/^[+\-*/]$/.test(value) && !/[+\-*/]$/.test(formulaDisplay)) {
        formulaDisplay = formulaDisplay + value;
        resultDisplay = "0"
        currentDisplay(formulaDisplay, resultDisplay);
        return;
    }

    // dot을 눌렀을 때
    // -> 결과값(resultDisplay)에 이미 dot이 포함된 경우, 그냥 return;으로 끝낸다.
    // -> 수식값(formulaDisplay)이 사칙연산으로 끝날 때, 최초로 dot을 눌렀을 때
    // 0.을 결과값(resultDisplay)에 반환한다.
    if (value === ".") {
        console.log(typeof resultDisplay)

        if (resultDisplay === "0") {
            resultDisplay = resultDisplay + value;
            currentDisplay(formulaDisplay, resultDisplay);
            return;
        }

        if (resultDisplay.indexOf(".") !== -1) {
            return;
        } else {
            resultDisplay = resultDisplay + value;
            currentDisplay(formulaDisplay, resultDisplay);
        }
    }

}

// 키보드 입력 이벤트
document.addEventListener("keydown", (event) => {
    let key = event.key;

    if (key === "Backspace") {
        key = "back";
    }
    if (key === "Enter") {
        key = "=";
    }
    if (key === "Escape") {
        key = "clear";
    }

    if (NUMBER_INPUT_REGEX.test(key) || ["=", "clear", "back"].includes(key)) {
        input(key);
        event.preventDefault();
        console.log(key);
    }
});