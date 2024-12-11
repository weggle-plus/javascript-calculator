"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
let currentExpression = '';
let resultDisplay;
let expressionDisplay;
function initializeCalculator() {
    resultDisplay = document.querySelector('.text-wrapper-5');
    expressionDisplay = document.querySelector('.p');
    document
        .querySelectorAll('[class^="overlap-group-wrapper"], [class^="element-button"], [class^="overlap-group"], [class^="rectangle"]')
        .forEach(button => {
        button.addEventListener('click', e => {
            const target = e.currentTarget;
            const value = target.textContent?.trim();
            if (!value)
                return;
            handleInput(value);
        });
    });
    document.addEventListener('keydown', e => {
        const key = e.key;
        if (key.match(/[0-9]/) ||
            key === '+' ||
            key === '-' ||
            key === '*' ||
            key === '/' ||
            key === '=' ||
            key === 'Enter' ||
            key === 'Backspace' ||
            key === 'Escape' ||
            key === '.') {
            handleInput(key);
        }
    });
}
function handleInput(value) {
    switch (value) {
        case 'AC':
        case 'Escape':
            currentExpression = '';
            resultDisplay.textContent = currentExpression;
            break;
        case '<':
        case 'Backspace':
            currentExpression = currentExpression.slice(0, -1);
            break;
        case '=':
        case 'Enter':
            try {
                const tokens = (0, index_js_1.tokenizer)(currentExpression);
                const postfix = (0, index_js_1.infixToPostfix)(tokens);
                const result = (0, index_js_1.calculatePostfix)(postfix);
                resultDisplay.textContent = result.toString();
            }
            catch (error) {
                resultDisplay.textContent = '에러';
            }
            break;
        case '×':
            currentExpression += '*';
            break;
        case '÷':
            currentExpression += '/';
            break;
        default:
            currentExpression += value;
    }
    expressionDisplay.textContent = currentExpression;
}
document.addEventListener('DOMContentLoaded', initializeCalculator);
//# sourceMappingURL=calculator.js.map