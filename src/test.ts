import { Operator } from './types/types';

let input = '1 + 1';

let = input.split('*|/|+|-');

function 후위식으로변환(전위식){
    const 후위리스트 = [];
    const 연산자스택 = [];

    전위식.map((current, index) => {
        if(current === 연산자):
            while(연산자스택탑 우선순위가 current보다 크면):
                후위리스트.push(연산자스택.pop());
            연산자스택.push(current);
        else:
            후위리스트.push(current);
    })
}