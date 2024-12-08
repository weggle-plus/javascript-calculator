### 페어프로그래밍 규칙

- 30분씩 돌아가면서 한다.
- 소통 열심히 하기!
- 커밋은 최대한 기능 별로 쪼개어 보내기

### 커밋 컨벤션

- `docs`, `feat`, `fix`, `refactor`, `rename`, `style`, `test`

### 요구사항

- 사용자가 숫자와 연산자를 입력한다
  - 키패드(`=`, `-`, `/`, `*`, 숫자), 화면 클릭 모두 동작해야한다.
- 입력된 수식을 사칙 연산 우선 순위에 맞춰 계산한다.
- 사칙 연산 우선 순위
  - 1순위: `x`, `/`
  - 2순위: `+`, `-`
- 사칙 연산 우선 순위가 잘 나오는지 test 코드 작성하기
  - `2 + 3 x 4 / 2 = 8`

### 기능 구현 전 설계

- 1. 간단한 인터페이스 구현
- 2. 기능 구현
  - 입력한 값 유효성 검사 기능 (숫자와 연산자 외 다른 문자 입력 시 예외 처리)
  - 우선 순위 판단 기능
  - 계산된 값 출력 기능
  - 음수 계산 구현
- 3. test 코드 작성
- 4. css 스타일 구현

### 계산 전 예외 처리

1. 기호를 반복해서 넣었을 때
2. `.`을 반복해서 넣었을 때
3. 기호를 먼저 눌렀을 때
4. 기호를 마지막으로 누르고 '='을 눌렀을 때
5. 0으로 나누었을 때
6. 0이 반복적으로 눌렸을 때
