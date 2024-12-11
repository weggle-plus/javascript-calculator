import { Token } from './types/types';
export declare function tokenizer(input: string): Token[];
export declare function infixToPostfix(tokens: Token[]): Token[];
export declare function calculatePostfix(postfix: Token[]): number;
