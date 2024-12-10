import { tokenizer, infixToPostfix, calculatePostfix } from './index';

let currentExpression = '';
let resultDisplay: HTMLParagraphElement;
let expressionDisplay: HTMLParagraphElement;

function initializeCalculator() {
    resultDisplay = document.querySelector('.text-wrapper-5') as HTMLParagraphElement;
    expressionDisplay = document.querySelector('.p') as HTMLParagraphElement;
    
    document.querySelectorAll('.div-wrapper, .overlap-group').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            const value = target.textContent?.trim();
            
            if (!value) return;
            
            switch(value) {
                case 'AC':
                    currentExpression = '';
                    break;
                case '<':
                    currentExpression = currentExpression.slice(0, -1);
                    break;
                case '=':
                    try {
                        const tokens = tokenizer(currentExpression);
                        const postfix = infixToPostfix(tokens);
                        const result = calculatePostfix(postfix);
                        resultDisplay.textContent = result.toString();
                        currentExpression = result.toString();
                    } catch (error) {
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
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeCalculator); 