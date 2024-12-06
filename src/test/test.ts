
import { tokenizer, infixToPostfix} from '../index';
import {Token} from '../types/types';


describe('tokenizer function', () => {
    
  it('should tokenize a simple arithmetic expression', () => {
    const input = '3 + 5';
    const expected: Token[] = [3, '+', 5];
    console.log(tokenizer(input));
    expect(tokenizer(input)).toEqual(expected);
  });

  it('should ignore spaces and equals sign', () => {
    const input = '4 * 5 =';
    const expected: Token[] = [4, '*', 5];
    console.log(tokenizer(input));
    expect(tokenizer(input)).toEqual(expected);
  });

  it('should handle multiple operators correctly', () => {
    const input = '10+20/4';
    const expected: Token[] = [10, '+', 20, '/', 4];
    console.log(tokenizer(input));
    expect(tokenizer(input)).toEqual(expected);
  });

  it('should return an empty array for an empty string', () => {
    const input = '';
    const expected: Token[] = [];
    console.log(tokenizer(input));
    expect(tokenizer(input)).toEqual(expected);
  });

  it('should handle invalid characters gracefully', () => {
    const input = '7a + 2';
    const expected: Token[] = [7, '+', 2]; // Assuming non-numeric characters are ignored
    console.log(tokenizer(input));
    expect(tokenizer(input)).toEqual(expected);
  });
});

describe('infixToPostfix 함수 테스트', () => {

    it('숫자만 있는 경우, 후위 표기법으로 변환해야 한다', () => {
        const input: Token[] = [3, 4, 5];
        const expected: Token[] = [3, 4, 5];  // 숫자만 있을 경우 그대로 출력
        console.log(infixToPostfix(input));
        expect(infixToPostfix(input)).toEqual(expected);
    });

    it('단일 연산자가 있는 경우, 후위 표기법으로 변환해야 한다', () => {
        const input: Token[] = [3, '+', 5];
        const expected: Token[] = [3, 5, '+'];  // 연산자가 뒤로 가야 한다.
        console.log(infixToPostfix(input));
        expect(infixToPostfix(input)).toEqual(expected);
    });

    it('두 개의 연산자가 있을 때, 연산자 우선순위에 따라 후위 표기법으로 변환해야 한다', () => {
        const input: Token[] = [3, '+', 5, '*', 2];
        const expected: Token[] = [3, 5, 2, '*', '+'];  // '*' 연산자가 '+' 보다 우선순위가 높다.
        console.log(infixToPostfix(input));
        expect(infixToPostfix(input)).toEqual(expected);
    });

    it('복잡한 연산식에서 후위 표기법으로 정확히 변환해야 한다', () => {
        const input: Token[] = [3, '+', 5, '*', 2, '-', 8];
        const expected: Token[] = [3, 5, 2, '*','+', 8, '-'];  // 연산자 우선순위 고려
        console.log(infixToPostfix(input));
        expect(infixToPostfix(input)).toEqual(expected);
    });

});

