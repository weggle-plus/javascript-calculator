import {
    elementType,
    getAnswer,
    getLastElementType,
    getElementType,
} from './calculator.js';

let inputDisplay = document.getElementById('display');
let outputDisplay = document.getElementById('result');
let buttons = document.querySelectorAll('.buttons button');

limitInput(inputDisplay);

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        handleInput(e);
    });
});

inputDisplay.addEventListener('keydown', function (e) {
    e.preventDefault();
    handleInput(e);
});

// 입력제한
function limitInput(input) {
    const regex = /^[0-9+\-*./]*$/;
    input.addEventListener('input', function () {
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^0-9+\-*./]/g, '');
        }
    });
}

function handleInput(e) {
    let value;

    if (e.type === 'click') {
        value = e.target.value;
    } else if (e.type === 'keydown') {
        const key = e.key;
        if (getElementType(key)) {
            value = key;
        }

        if (key === 'Enter' || key === '=') { //Enter > 결과값 출력(=)
            value = "="
        }
        if (key === 'Backspace') {
            removeElement();
            return;
        }
        if (key === 'Escape') { //ESC > 전체 삭제(AC)
            resetDisplay();
            return;
        }
    }

    if (value) {
        switch (value) {
            case '=':
                getAnswerAndDisplay();
                break;
            case 'AC':
                resetDisplay();
                break;
            case '<':
                removeElement();
                break;
            default:
                addElementToDisplay(value);
                break;
        }
    }
}

// 버튼 (입력) 이벤트
function addElementToDisplay(element) {
    const inputValue = inputDisplay.value;
    const type = getElementType(element);

    if (type === elementType.OPERATOR) {
        element = processOperatorElement(inputValue, element);
    } else if (isExistOutputDisplayValue()) {
        return;
    } else if (type === elementType.DECIMALPOINT) {
        element = processDecimalPointElement(inputValue, element);
    }

    inputDisplay.value += element;
}

function getAnswerAndDisplay() {
    let inputValue = 0 + inputDisplay.value;
    const answer = getAnswer(inputValue);

    outputDisplay.value = answer;
}

function resetDisplay() {
    inputDisplay.value = '';
    outputDisplay.value = '';
}

function removeElement() {
    if (isExistOutputDisplayValue()) {
        return;
    }

    inputDisplay.value = inputDisplay.value.slice(0, -1);
}

// 결과값 있을 때
function isExistOutputDisplayValue() {
    if (outputDisplay.value.length) {
        return true;
    }
    return false;
}

// 연산자 처리
function processOperatorElement(inputValue, element) {
    if (isExistOutputDisplayValue()) {
        inputDisplay.value = outputDisplay.value + element;
        outputDisplay.value = '';
        return '';
    }

    const lastElementType = getLastElementType(inputValue);
    if (lastElementType === elementType.OPERATOR) {
        return '';
    }

    return element;
}

// 소수점 처리
function processDecimalPointElement(inputValue, element) {
    const lastElementType = getLastElementType(inputValue);
    if (lastElementType === elementType.DECIMALPOINT) {
        return '';
    }

    if (lastElementType !== elementType.NUMBER) {
        return '0' + element;
    }

    return element;
}
