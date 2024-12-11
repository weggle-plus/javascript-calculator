import { Notation } from "../types/enums.js";
import { IExpressionManager } from "../interfaces/IExpressionManager.js";
import { ExpressionCharacter, Operator } from "../types/types.js";
import { Expression } from "../interfaces/interfaces.js";
import {
  isOperand,
  isOperator,
  isValidNumber,
  trimNumber,
} from "../utilities.js";

export class ExpressionManager implements IExpressionManager {
  constructor() {
    this.expression = {
      operands: [],
      operators: [],
    };
    this.operandInputPointer = 0;
    this.operatorInputPointer = 0;
    this.lastInputCharacter = undefined;
  }
  operandInputPointer: number;
  operatorInputPointer: number;
  expression: Expression;
  lastInputCharacter: ExpressionCharacter | undefined;
  addCharacter(character: ExpressionCharacter): boolean {
    if (isOperand(character)) {
      if (
        this.lastInputCharacter !== undefined &&
        isOperator(this.lastInputCharacter)
      ) {
        ++this.operandInputPointer;
      }

      const nextNumber =
        this.expression.operands[this.operandInputPointer] === undefined
          ? character
          : this.expression.operands[this.operandInputPointer] + character;

      if (!isValidNumber(nextNumber)) {
        return false;
      }

      this.expression.operands[this.operandInputPointer] =
        trimNumber(nextNumber);
      this.lastInputCharacter = character;
      return true;
    }

    if (isOperator(character)) {
      if (this.expression.operands[0] === undefined) {
        return false;
      }

      if (this.expression.operators[0] !== undefined) {
        if (
          this.lastInputCharacter !== undefined &&
          isOperand(this.lastInputCharacter)
        ) {
          ++this.operatorInputPointer;
        }
      }

      this.expression.operators[this.operatorInputPointer] =
        character as Operator;
      this.lastInputCharacter = character;

      this.trimOperand();

      return true;
    }

    return false;
  }

  deleteCharacter(): boolean {
    if (this.lastInputCharacter === undefined) {
      return false;
    }

    if (isOperand(this.lastInputCharacter)) {
      if (this.expression.operands[this.operandInputPointer] === undefined) {
        return false;
      }

      if (this.expression.operands[this.operandInputPointer].length === 1) {
        this.expression.operands.splice(-1);

        if (0 < this.operandInputPointer) {
          --this.operandInputPointer;
        }

        this.lastInputCharacter =
          this.expression.operators[this.operatorInputPointer];

        return true;
      }

      this.expression.operands[this.operandInputPointer] =
        this.expression.operands[this.operandInputPointer].slice(0, -1);
      this.lastInputCharacter = this.expression.operands[
        this.operandInputPointer
      ].slice(-1) as ExpressionCharacter;

      return true;
    } else {
      if (this.expression.operators[this.operatorInputPointer] === undefined) {
        return false;
      }

      this.expression.operators.splice(-1);
      if (0 < this.operatorInputPointer) {
        --this.operatorInputPointer;
      }

      this.lastInputCharacter = this.expression.operands[
        this.operandInputPointer
      ].slice(-1) as ExpressionCharacter;

      return true;
    }
  }

  reset(): void {
    this.expression.operands = [];
    this.expression.operators = [];
    this.operandInputPointer = 0;
    this.operatorInputPointer = 0;
    this.lastInputCharacter = undefined;
  }

  getExpression(notation: Notation): string {
    let expressionString = "";

    if (
      this.expression.operands.length === 0 &&
      this.expression.operators.length === 0
    ) {
      return expressionString;
    }

    switch (notation) {
      case Notation.Infix:
        let operatorIndex = 0;

        expressionString = this.expression.operands.reduce(
          (infixExpression, operand) => {
            if (operand !== undefined) {
              infixExpression += operand + " ";
            }
            if (this.expression.operators[operatorIndex] !== undefined) {
              infixExpression +=
                this.expression.operators[operatorIndex++] + " ";
            }
            return infixExpression;
          },
          ""
        );
        break;
      default:
        break;
    }

    return expressionString.trimEnd();
  }

  trimExpression(): void {
    if (this.expression.operands.length === 0) {
      return;
    }

    if (this.expression.operands.length === this.expression.operators.length) {
      this.deleteCharacter();
    }
  }

  trimOperand(): void {
    const operandLastCharacter =
      this.expression.operands[this.operandInputPointer].slice(-1);

    switch (operandLastCharacter) {
      case ".":
        this.expression.operands[this.operandInputPointer] =
          this.expression.operands[this.operandInputPointer].slice(0, -1);
        break;
      case "0":
        this.expression.operands[this.operandInputPointer] =
          this.expression.operands[this.operandInputPointer].replace(
            /0+$/g,
            ""
          );
        break;
    }
  }
}
