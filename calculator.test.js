import { getAnswer } from './calculator.js';
import Decimal from 'decimal.js-light';

global.Decimal = Decimal;

test('2+3*4/2=8', () => {
    expect(getAnswer('2+3*4/2')).toBe(8);
});