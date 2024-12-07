function addToDisplay(value){
    document.getElementById("display").value += value;
}

function reset(){
    document.getElementById("display").value = "";
}

function calculate(){
    const display = document.getElementById("display");
    const displayValue = display.value;
    try{
        const numbers = displayValue.match(/(\d+(\.\d+)?)/g).map(Number);
        const operators = displayValue.match(/[\+\-\x\/]/g);
        console.log("displayValue: " + displayValue);
        console.log("numbers: " + numbers);
        console.log("operators: " + operators);
        
        if (!operators){
            display.value = numbers[0];
            return;
        }

        let multipleAndDivision = (numbers, operators) => {
            let isMultiple = operators.includes("x");
            let isDivision = operators.includes("/");
            let index;
            if (!isMultiple && !isDivision){
                return addAndSub(numbers, operators);
            }

            if (isMultiple){
                index = operators.indexOf("x");
            } else {
                index = operators.indexOf("/");
            }

            const left = numbers[index];
            const right = numbers[index + 1];
            const operator = operators[index];
            let result;
            if (operator === "x"){
                result = left * right;
            } else {
                result = left / right;
            }

            numbers.splice(index, 2, result);
            operators.splice(index, 1);

            return multipleAndDivision(numbers, operators);
        }

        let addAndSub = (numbers, operators) => {
            let result = numbers[0];
            const calculate = (index) => {
                if (index >= operators.length){
                    return result;
                }

                const operator = operators[index];
                const number = numbers[index + 1];

                if (operator === "+"){
                    result += number;
                } else if (operator === "-"){
                    result -= number;
                }

                return calculate(index + 1);
            }
            return calculate(0);
        }
        display.value = multipleAndDivision(numbers, operators);
    } catch(error){
        display.value = "오류";
    }
}