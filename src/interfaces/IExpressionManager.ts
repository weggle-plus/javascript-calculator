import { Notation } from "../types/enums.js";
import { ExpressionCharacter } from "../types/types.js";
import { Expression } from "./interfaces.js";

export interface IExpressionManager {
  expression: Expression;
  operandInputPointer: number;
  operatorInputPointer: number;
  lastInputCharacter: ExpressionCharacter | undefined;
  addCharacter(character: ExpressionCharacter): boolean;
  deleteCharacter(): boolean;
  reset(): void;
  getExpression(notation: Notation): string;
  trimExpression(): void;
  trimOperand(): void;
}
