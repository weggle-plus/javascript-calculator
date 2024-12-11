import {Operator, Token} from './types/types.js';
import {OPERATOR, OPERATOR_PRIORITY} from './types/constants.js';

export function tokenizer(input: string): Token[] {
  let currentNumber = '';
  const tokens: Token[] = [];
  [...input].map(char => {
    if (char === ' ') {
      return;
    }
    if (!OPERATOR.includes(char) && isNaN(Number(char)) && char !== '.') {
      return;
    }
    if (OPERATOR.includes(char)) {
      if (currentNumber !== '') {
        tokens.push(Number(currentNumber));
        currentNumber = '';
      }
      tokens.push(char as Operator);
    } else {
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

export function infixToPostfix(tokens: Token[]): Token[] {
  const postfix: Token[] = [];
  const operators: Operator[] = [];

  tokens.map(token => {
    if (typeof token === 'number') {
      postfix.push(token);
    } else {
      while (
        operators.length > 0 &&
        OPERATOR_PRIORITY[token] <=
          OPERATOR_PRIORITY[operators[operators.length - 1]]
      ) {
        postfix.push(operators.pop()! as Token);
      }
      operators.push(token);
    }
  });
  while (operators.length > 0) {
    postfix.push(operators.pop()! as Token);
  }
  return postfix;
}

export function calculatePostfix(postfix: Token[]): number {
  const result = postfix.reduce((stack: number[], cur: Token): number[] => {
    if (!isNaN(Number(cur))) {
      stack.push(Number(cur));
    } else {
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
  }, [] as number[]);

  if (result.length !== 1) {
    throw new Error('후위 표기식 계산 결과가 올바르지 않습니다.');
  }
  return parseFloat(result[0].toFixed(11));
}
