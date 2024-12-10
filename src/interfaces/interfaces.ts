import { Operator } from "../types/types.js";

export interface Expression {
  operands: string[];
  operators: Operator[];
}
