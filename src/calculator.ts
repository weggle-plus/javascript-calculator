import { tokenizer, infixToPostfix, calculatePostfix } from './index.js';

let currentExpression = '';
let resultDisplay: HTMLParagraphElement;
let expressionDisplay: HTMLParagraphElement;

function initializeCalculator() {
    resultDisplay = document.querySelector('.text-wrapper-5') as HTMLParagraphElement;
    expressionDisplay = document.querySelector('.p') as HTMLParagraphElement;
    
    // 버튼 클릭 이벤트 처리
    document.querySelectorAll('.div-wrapper, .overlap-group, .element-wrapper, .overlap-5, .rectangle').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            const value = target.textContent?.trim();

            if (!value) return;

            handleInput(value);
        });
    });

    // 키보드 입력 처리
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        // 숫자, 연산자, 기타 기능 키에 대한 입력 처리
        if (key.match(/[0-9]/) || key === '+' || key === '-' || key === '*' || key === '/' || key === '=' || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
            handleInput(key);
        }
    });
}

// 입력을 처리하는 함수
function handleInput(value: string) {
    switch(value) {
        case 'AC':
        case 'Escape': // Escape 키로 AC 기능 실행
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
}

document.addEventListener('DOMContentLoaded', initializeCalculator);
