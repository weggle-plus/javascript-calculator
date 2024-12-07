/*
'=' 버튼 입력시 결과값을 반환한다.
 1) 입력된 연산식을 변환한다: 중위표기법 -> 후위표기법 (연산기호 우선순위 부여, 스택 활용)
 2) 변환된 연산식 계산후 결과값을 반환한다.
*/

// 기본 사칙연산
function calculate(operand1, operand2, operator){
    switch (operator){
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}

// 후위표기법으로 변환 (스택 활용)

// 연산자 우선순위 비교

// 후위표기법으로 변환된 연산식 계산

// 화면 표시

// 버튼 이벤트 (숫자, 연산기호, 지우기, 모두 지우기, 결과)

// 예외처리
// 1. 연산자 뒤에 곧바로 .이 오면 앞에 0을 붙여줌 (0.)
// 2. 연산자 연속 입력 방지
// 3. 결과값 출력 후 식을 이어서 작성할 수 있도록 할 것인지?
//   3-1) Yes: 결과값 기억해야함, 이어서 입력받을 때는 연산자가 와야함 (이전 결과값을 피연산자1로 사용)
//   3-2) No: 초기화, 기존 로직 그대로 반복
