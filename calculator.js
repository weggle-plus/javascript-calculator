let inputDisplay = document.getElementById('display')
let outputDisplay = document.getElementById('result')

function isExistOutputDisplayValue(){
    if(outputDisplay.value.length){
        return true;
    }
    return false;
}

// 결과값이 있을 때
//  ㄴ 연산자만 입력 가능
//  ㄴ 전체 삭제 가능
// 연산자 연속입력 방지
//  ㄴ 입력값 마지막이 연산자일 때 연산자 입력 불가능
//  ㄴ 아무 입력값 없을 때 연산자 입력 불가능

function addElementToDisplay(element){
    const operators = ["+", "-", "/", "*"];
    let inputValue = inputDisplay.value;
    if (isExistOutputDisplayValue()){
        if(operators.includes(element)){
            inputDisplay.value = outputDisplay.value + element;
            outputDisplay.value = "";
        }
        return;
    }
    if(operators.includes(element)){


        if(inputDisplay.value[inputDisplay.value.length -1]){}

    }
    inputDisplay.value += element;
}

function resetDisplay(){
    inputDisplay.value = "";
    outputDisplay.value = "";
}

function removeElement(){
    if (isExistOutputDisplayValue()){
        return;
    }

    inputDisplay.value = inputDisplay.value.slice(0,-1);
}

function getResult(){
    // console.log(calculatePostfix(infixToPostfix('1+2-3*2+1.2')));
    const postfix = infixToPostfix(inputDisplay.value);
    const result = calculatePostfix(postfix);
    
    outputDisplay.value = result;
}


function calculate(operand1, operand2, operator) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);
    switch (operator){
        case '+' : return operand1 + operand2;
        case '-' : return operand1 - operand2;
        case '*' : return operand1 * operand2;
        case '/' : return operand1 / operand2;
    }
}

// 후위표기법으로 변환
function infixToPostfix(infix){
    const operatorPrecedence = {
        '+' : 0, 
        '-' : 0,
        '*' : 1,
        '/' : 1
    };
    const postfix = [];
    const operatorStack = [];
    const elements = infix.match(/\d+(\.\d+)?|[+\-*/]/g);

    elements.forEach(element => {
        if(isNaN(element)){
            while(operatorStack.length > 0){
                const operatorStackPeek = operatorStack[operatorStack.length - 1];
                if(operatorPrecedence[element] <= operatorPrecedence[operatorStackPeek]){
                    postfix.push(operatorStack.pop());
                }else{
                    break;
                }
            }
            operatorStack.push(element);
            return;
        }
        postfix.push(element);
    });

    while(operatorStack.length > 0){
        postfix.push(operatorStack.pop())
    }
    // console.log(postfix);
    return postfix;
}
// console.log(infixToPostfix('1+2-3*2+1.2'));


function calculatePostfix(postfix){
    const operandStack = [];

    while(postfix.length > 0){
        const front = postfix[0];

        if(isNaN(front)){
            const operand2 = operandStack.pop();
            const operand1 = operandStack.pop();

            const value = calculate(operand1, operand2, front);
            operandStack.push(value);
            postfix.shift();
        }else{
            operandStack.push(postfix.shift());
        }
    }
    const answer = operandStack.pop();
    
    return answer;
}
