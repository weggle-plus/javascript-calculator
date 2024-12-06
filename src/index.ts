import { Operator, Token } from './types/types';
import { OPERATOR, OPERATOR_PRIORITY } from './types/constants';
let input = '1 + 1';

export function tokenizer(input: string): Token[] {
    let currentNumber = '';
    const tokens: Token[] = [];
    [...input].map(char => {
        if (char === ' ') {
            return;
        }
        if (!OPERATOR.includes(char) && isNaN(Number(char))) {
            return;
        }
        if (OPERATOR.includes(char)) {
            if (currentNumber !== '') {
                tokens.push(Number(currentNumber));
                currentNumber = '';
            }
            tokens.push(char as Operator)
        }
        else {
            currentNumber += char;
        }
    })
    if (currentNumber !== '') {
        tokens.push(Number(currentNumber));
        currentNumber = '';
    }
    return tokens;
}

export function infixToPostfix(tokens: Token[]): Token[] {
    const postfix: Token[] = [];
    const operators: Operator[] = [];

    tokens.map((token) => {
        if (typeof token === 'number') {
            postfix.push(token);
        } else {
            while(operators.length > 0 && (OPERATOR_PRIORITY[token] <= OPERATOR_PRIORITY[operators[operators.length -1]])){               
                    postfix.push(operators.pop()! as Token);                
            }
            operators.push(token);
        }
    })
    while(operators.length > 0){
        postfix.push(operators.pop()! as Token);
    }
    return postfix;
} 
