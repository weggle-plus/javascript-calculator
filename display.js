const displayFormula = document.querySelector(".calculator .formula");
const displayResult = document.querySelector(".calculator .result");

export const currentDisplay = (formula, result) => {
    displayFormula.textContent = formula || "0";
    displayResult.textContent = result || "0";
};