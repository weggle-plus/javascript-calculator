const numBtns = document.querySelectorAll('.num');
const operBtns = document.querySelectorAll('.oper');
const res = document.querySelector('.result');

let equation = "";

numBtns.forEach(function(value){
    value.addEventListener("click", function(event){
        equation += event.target.innerHTML;
        console.log(equation);
        res.innerHTML = equation;
    })
})

operBtns.forEach(function(value){
    value.addEventListener("click", function(event){
        equation += event.target.innerHTML;
        console.log(equation);
        res.innerHTML = equation;
    })
})

