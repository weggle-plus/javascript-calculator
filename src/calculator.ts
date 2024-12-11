import {tokenizer, infixToPostfix, calculatePostfix} from './index.js';

let currentExpression = '';
let resultDisplay: HTMLParagraphElement;
let expressionDisplay: HTMLParagraphElement;

function initializeCalculator() {
  resultDisplay = document.querySelector(
    '.text-wrapper-5',
  ) as HTMLParagraphElement;
  expressionDisplay = document.querySelector('.p') as HTMLParagraphElement;

  document
    .querySelectorAll(
      '[class^="overlap-group-wrapper"], [class^="element-button"], [class^="overlap-group"], [class^="rectangle"]',
    )
    .forEach(button => {
      button.addEventListener('click', e => {
        const target = e.currentTarget as HTMLElement;
        const value = target.textContent?.trim();

        if (!value) return;

        handleInput(value);
      });
    });

  document.addEventListener('keydown', e => {
    const key = e.key;

    if (
      key.match(/[0-9]/) ||
      key === '+' ||
      key === '-' ||
      key === '*' ||
      key === '/' ||
      key === '=' ||
      key === 'Enter' ||
      key === 'Backspace' ||
      key === 'Escape' ||
      key === '.'
    ) {
      handleInput(key);
    }
  });
}

function handleInput(value: string) {
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
        const tokens = tokenizer(currentExpression);
        const postfix = infixToPostfix(tokens);
        const result = calculatePostfix(postfix);
        resultDisplay.textContent = result.toString();
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
