# 멘토링 과제

## HTML 계산기 만들기

사용자가 입력한 문자열 값에 따라 사칙연산을 수행할 수 있는 계산기를 구현해야 한다.

## 구현 순서

1. 문자열 받기
    1.1 html 작성
    1.2 css 작성
    1.3 로직 작성
        1.3.1 마우스 입력
        1.3.2 키보드 입력
2. 문자열 나누기
3. 연산자 우선순위대로 저장
4. 저장된 대로 계산
5. 출력

## 요구사항

- 예를 들어 "2 + 3 x 4 / 2"와 같은 문자열을 입력할 경우 2 + 3 x 4 / 2 실행 결과인 8을 출력해야 한다.
- **사칙 연산의 우선순위를 적용한다. (`x` , `/` 는 1순위, `+`, `` 는 2순위)**
- [**피그마**](https://www.figma.com/design/PUwKOQ98OulmCcWqJLkkvf/%EA%B3%BC%EC%A0%9C-%EB%AA%A9%EB%A1%9D?node-id=1-3&t=2BXcqg02LGA3iIJA-4)에 맞춰 프론트엔드를 구현하면 됩니다.
    - 키패드에서 숫자를 입력하거나 `=` 나, `` , `/` , `` 를 입력하면 동작할수 있어야 합니다.
    - 클릭해도 동작할수 있어야 합니다.
- 테스트 케이스 딱 하나 작성하기.
    - 사칙연산 우선순위가 잘 나오는지 확인하기.
    - `2 + 3 x 4 / 2 = 8` 이거 딱 하나만 테스트 코드에 넣어주세요.
