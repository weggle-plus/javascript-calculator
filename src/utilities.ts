import { Operator, OperatorValues } from "./types/types.js";

export function isPoint(character: string): boolean {
  return character === ".";
}

export function isBackspace(character: string): boolean {
  return character === "Backspace";
}

export function isEquals(character: string): boolean {
  return character === "=";
}

export function isDigitNumber(character: string): boolean {
  if (character.length !== 1) {
    return false;
  }
  return "0" <= character && character <= "9";
}

export function isOperand(character: string): boolean {
  return isDigitNumber(character) || isPoint(character);
}

export function isOperator(character: string): boolean {
  if (character.length !== 1) {
    return false;
  }

  return OperatorValues.includes(character as Operator);
}

export function isValidNumber(string: string): boolean {
  let canNumber = true;

  const floatNumber = parseFloat(string);
  canNumber = !Number.isNaN(floatNumber);

  if (2 < string.split(".").length) {
    return false;
  }

  return canNumber;
}

export function trimNumber(string: string): string {
  const intNumber = parseInt(string);

  if (!string.includes(".")) {
    return intNumber.toString();
  }

  return string;
}
