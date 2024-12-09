class Stack {
  constructor() {
    this.items = []; // 스택의 요소를 저장할 배열
  }

  // 리스트의 가장 앞에 추가한다.
  push(val) {
    this.items.push(val);
  }

  // 리스트의 가장 앞에 있는 요소를 제거한다.
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // 가장 위에 있는 요소 확인. 스택이 비어있으면 null을 반환
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // 스택이 비어있는지 확인. 비어있으면 true, 그렇지 않으면 false를 반환
  isEmpty() {
    return this.items.length === 0;
  }

  // 현재 스택의 크기 반환
  size() {
    return this.items.length;
  }

  // 스택 비우기
  clear() {
    this.items = [];
  }

  // 스택 내용을 배열로 변환
  toArray() {
    return [...this.items];
  }
}

/** 예제 1 **/
const stack = new Stack();

console.log("스택에 1 추가:", stack.push(1)); // 1
console.log("스택에 2 추가:", stack.push(2)); // 2
console.log("스택에 3 추가:", stack.push(3)); // 3
console.log("현재 스택:", stack.toArray()); // [1, 2, 3]
console.log("스택의 크기:", stack.size()); // 3
console.log("맨 위의 요소:", stack.peek()); // 3
console.log("맨 위의 요소 제거:", stack.pop()); // 3
console.log("현재 스택:", stack.toArray()); // [1, 2]
console.log("스택이 비어있는가?", stack.isEmpty()); // false
console.log("스택의 크기:", stack.size()); // 2

stack.clear();
console.log("현재 스택:", stack.toArray()); // []
console.log("스택이 비어있는가?", stack.isEmpty()); // true


/** 예제 2 **/
// 유효성 검사
function isValidParentheses(s) {
  const stack = new Stack();
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  for (let char of s) {
    switch (char) {
      case '(':
      case '{':
      case '[':
        stack.push(char); // 여는 괄호를 스택에 추가
        break;
      
      case ')':
      case '}':
      case ']':
        if (stack.isEmpty()) return false; // 스택이 비어있으면 유효하지 않음
        const top = stack.pop(); // 스택의 맨 위 요소 제거
        if (pairs[top] !== char) return false; // 짝이 맞지 않으면 유효하지 않음
        break;
    }
  }

  return stack.isEmpty(); // 모든 괄호가 짝지어졌는지 확인
}

const test1 = "{[()]}";
const test2 = "{[(])}";
const test3 = "{[}";

console.log(`"${test1}"의 유효성:`, isValidParentheses(test1)); // true
console.log(`"${test2}"의 유효성:`, isValidParentheses(test2)); // false
console.log(`"${test3}"의 유효성:`, isValidParentheses(test3)); // false



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