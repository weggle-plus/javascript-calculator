const elementType = {
    NUMBER: 1,
    OPERATOR: 2,
    DECIMALPOINT: 3,
    EQUALS: 4
};

// 계산기 로직
function calculate(operand1, operand2, operator) {
    operand1 = new Decimal(operand1);
    operand2 = new Decimal(operand2);

    switch (operator) {
        case '+': return operand1.plus(operand2);
        case '-': return operand1.minus(operand2);
        case '*': return operand1.times(operand2);
        case '/': return operand1.div(operand2);
        default: return 0;
    }
}

// 중위표기식을 후위표기식으로 변환
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

// 후위표기식 계산
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

function getAnswer(inputValue) {
    const lastElementType = getLastElementType(inputValue);

    if (lastElementType === elementType.OPERATOR) {
        inputValue = inputValue.slice(0, -1);
    }

    const postfix = infixToPostfix(inputValue);
    const result = calculatePostfix(postfix);

    return result;
}

// 마지막 요소 타입 처리
function getLastElementType(inputValue) {
    const inputValueLength = inputValue.length;
    if (inputValueLength) {
        const lastElement = inputValue[inputValueLength - 1];
        const lastElementType = getElementType(lastElement);
        return lastElementType;
    }

    return undefined;
}

// 요소 타입 처리
function getElementType(element) {
    const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['+', '-', '/', '*'];

    if (operators.includes(element)) {
        return elementType.OPERATOR;
    }

    if (element === '.') {
        return elementType.DECIMALPOINT;
    }

    if (validNumbers.includes(element)) {
        return elementType.NUMBER;
    }

    return undefined;
}

module.exports = {
    elementType,
    getAnswer,
    getLastElementType,
    getElementType
}