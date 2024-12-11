// import { handleButtonClick, } from "./app.js"

const button = document.querySelector(".calculator.btn");
const display = document.querySelector(".calculator.display");


let formulaDisplay = "";
let resultDisplay = "";

export const currentDisplay = (formulaDisplay, resultDisplay) => {
    formula.textContent = formulaDisplay || "0";
    result.textContent =  resultDisplay || "0";
};

export { formulaDisplay, resultDisplay };