"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = tokenizer;
exports.infixToPostfix = infixToPostfix;
exports.calculatePostfix = calculatePostfix;
const constants_js_1 = require("./types/constants.js");
function tokenizer(input) {
    let currentNumber = '';
    const tokens = [];
    [...input].map(char => {
        if (char === ' ') {
            return;
        }
        if (!constants_js_1.OPERATOR.includes(char) && isNaN(Number(char)) && char !== '.') {
            return;
        }
        if (constants_js_1.OPERATOR.includes(char)) {
            if (currentNumber !== '') {
                tokens.push(Number(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        }
        else {
            if (char === '.' && currentNumber.includes('.')) {
                throw new Error('잘못된 소수 입력입니다.');
            }
            currentNumber += char;
        }
    });
    if (currentNumber !== '') {
        tokens.push(Number(currentNumber));
        currentNumber = '';
    }
    return tokens;
}
function infixToPostfix(tokens) {
    const postfix = [];
    const operators = [];
    tokens.map(token => {
        if (typeof token === 'number') {
            postfix.push(token);
        }
        else {
            while (operators.length > 0 &&
                constants_js_1.OPERATOR_PRIORITY[token] <=
                    constants_js_1.OPERATOR_PRIORITY[operators[operators.length - 1]]) {
                postfix.push(operators.pop());
            }
            operators.push(token);
        }
    });
    while (operators.length > 0) {
        postfix.push(operators.pop());
    }
    return postfix;
}
function calculatePostfix(postfix) {
    const result = postfix.reduce((stack, cur) => {
        if (!isNaN(Number(cur))) {
            stack.push(Number(cur));
        }
        else {
            const secondNumber = stack.pop();
            const firstNumber = stack.pop();
            if (firstNumber === undefined || secondNumber === undefined) {
                throw new Error('잘못된 후위표기식 입니다.');
            }
            switch (cur) {
                case '+':
                    stack.push(firstNumber + secondNumber);
                    break;
                case '-':
                    stack.push(firstNumber - secondNumber);
                    break;
                case '*':
                    stack.push(firstNumber * secondNumber);
                    break;
                case '/':
                    if (secondNumber === 0) {
                        throw new Error('0으로 나눌 수 없습니다.');
                    }
                    stack.push(firstNumber / secondNumber);
                    break;
            }
        }
        return stack;
    }, []);
    if (result.length !== 1) {
        throw new Error('후위 표기식 계산 결과가 올바르지 않습니다.');
    }
    return parseFloat(result[0].toFixed(11));
}
//# sourceMappingURL=index.js.map