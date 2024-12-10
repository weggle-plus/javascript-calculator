let inputDisplay = document.getElementById('display');
let outputDisplay = document.getElementById('result');

const elementType = {
    NUMBER: 1,
    OPERATOR: 2,
    DECIMALPOINT: 3,
    EQUALS: 4
};

inputDisplay.addEventListener("keyup", function(e){
    if(e.keyCode === 13){ //Enter > 결과값 출력(=)
        getResult();
    } 
    if(e.keyCode === 27){ //ESC > 전체 삭제(AC)
        resetDisplay();
    }
});

// 입력제한
function limitInput(input){
    const regex = /^[0-9+\-*./]*$/;
    input.onkeyup = function(e){
        if(!regex.test(this.value)){
            console.log(this.value[this.value.length -1]);
            this.value = this.value.replace(/[^0-9+\-*./]/g,'');
        }
    }
}
limitInput(inputDisplay);

// 결과값 있을 때
function isExistOutputDisplayValue(){
    if(outputDisplay.value.length){
        return true;
    }
    return false;
}

function processOperatorElement(inputValue, element) {
    const lastElementType = getLastElementType(inputValue);
    if (lastElementType === elementType.OPERATOR) {
        return '';
    }

    if (isExistOutputDisplayValue()) {
        inputDisplay.value = outputDisplay.value + element;
        outputDisplay.value = '';
        return '';
    }

    return element;
}

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

function getLastElementType(inputValue) {
    const inputValueLength = inputValue.length;
    if (inputValueLength) {
        const lastElement = inputValue[inputValueLength - 1];
        const lastElementType = getElementType(lastElement);
        return lastElementType;
    }

    return undefined;
}

function getElementType(element) {
    const operators = ['+', '-', '/', '*'];

    if (operators.includes(element)) {
        return elementType.OPERATOR;
    }

    if (element === '.') {
        return elementType.DECIMALPOINT;
    }

    if (element === '=') {
        return elementType.EQUALS;
    }

    if (isNaN(Number(element))) {
        return undefined;
    }

    return elementType.NUMBER;
}

// 버튼 (입력) 이벤트
function addElementToDisplay(element) {
    const inputValue = inputDisplay.value;
    const type = getElementType(element);

    if (type === elementType.EQUALS) {
        getResult();
        return;
    }

    if (type === elementType.OPERATOR) {
        element = processOperatorElement(inputValue, element);
    } else if (isExistOutputDisplayValue()) {
        return;
    } else if (type === elementType.DECIMALPOINT) {
        element = processDecimalPointElement(inputValue, element);
    }

    inputDisplay.value += element;
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

function getResult() {
    let inputValue = 0 + inputDisplay.value;
    const lastElementType = getLastElementType(inputValue);

    if (lastElementType === elementType.OPERATOR) {
        inputValue = inputValue.slice(0, -1);
    }

    const postfix = infixToPostfix(inputValue);
    const result = calculatePostfix(postfix);

    outputDisplay.value = result;
}

// 계산기 로직
function calculate(operand1, operand2, operator) {
    operand1 = new Decimal(operand1);
    operand2 = new Decimal(operand2);

    switch (operator) {
        case '+': return operand1.plus(operand2);
        case '-': return operand1.minus(operand2);
        case '*': return operand1.times(operand2);
        case '/': return operand1.div(operand2);
    }
}

function infixToPostfix(infix) {
    const operatorPrecedence = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1
    };

    const postfix = [];
    const operatorStack = [];
    const elements = infix.match(/\d+(\.\d+)?|[+\-*=/]/g);

    elements.forEach(element => {
        if (isNaN(element)) {
            while (operatorStack.length > 0) {
                const operatorStackPeek = operatorStack[operatorStack.length - 1];
                if (operatorPrecedence[element] <= operatorPrecedence[operatorStackPeek]) {
                    postfix.push(operatorStack.pop());
                } else {
                    break;
                }
            }
            operatorStack.push(element);
            return;
        }
        postfix.push(element);
    });

    while (operatorStack.length > 0) {
        postfix.push(operatorStack.pop())
    }

    return postfix;
}

function calculatePostfix(postfix) {
    const operandStack = [];

    while (postfix.length > 0) {
        const front = postfix[0];

        if (isNaN(front)) {
            const operand2 = operandStack.pop();
            const operand1 = operandStack.pop();

            const value = calculate(operand1, operand2, front);
            operandStack.push(value);
            postfix.shift();
        } else {
            operandStack.push(postfix.shift());
        }
    }
    const answer = operandStack.pop();

    return new Decimal(answer);
}