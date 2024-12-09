
import { tokenizer, infixToPostfix, calculatePostfix} from '../index';
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


describe('calculatePostfix 함수 테스트', () => {

  it('단일 연산이 있는 경우, 결과를 정확히 계산해야 한다', () => {
      const input: Token[] = [3, 5, '+'];
      const expected = 8;
      expect(calculatePostfix(input)).toBe(expected);
  });

  it('여러 연산이 있는 경우, 우선순위에 따라 정확히 계산해야 한다', () => {
      const input: Token[] = [3, 5, 2, '*', '+'];
      const expected = 13; // 3 + (5 * 2)
      expect(calculatePostfix(input)).toBe(expected);
  });

  it('연산 순서와 괄호 표현을 포함한 계산이 정확해야 한다', () => {
      const input: Token[] = [3, 5, 2, '*', '+', 8, '-'];
      const expected = 5; // (3 + (5 * 2)) - 8
      expect(calculatePostfix(input)).toBe(expected);
  });

  it('나눗셈 연산을 포함한 경우, 결과가 정확해야 한다', () => {
      const input: Token[] = [10, 2, '/'];
      const expected = 5; // 10 / 2
      expect(calculatePostfix(input)).toBe(expected);
  });

  it('복잡한 계산을 처리할 수 있어야 한다', () => {
      const input: Token[] = [10, 2, '/', 3, '+', 4, '*'];
      const expected = 32; // ((10 / 2) + 3) * 4
      expect(calculatePostfix(input)).toBe(expected);
  });

  it('잘못된 후위 표기식이 입력될 경우, 에러를 던져야 한다', () => {
      const input: Token[] = [3, '+']; // 연산에 필요한 피연산자가 부족함
      expect(() => calculatePostfix(input)).toThrow('잘못된 후위표기식 입니다.');
  });
});

