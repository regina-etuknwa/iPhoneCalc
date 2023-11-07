const numberBtn = document.querySelectorAll(".numbers");
const operatorBtn = document.querySelectorAll(".operators");
const clearBtn = document.querySelector(".clear");
const percentBtn = document.querySelector(".percent");
const decimalBtn = document.querySelector(".decimal");
const plusminusBtn = document.querySelector(".plusminus");
const inputField = document.querySelector(".input-field");
const outputField = document.querySelector(".output-field");
const allBtn = document.querySelectorAll(".btn");

let currentValue = "0";
let previousValue = 0;
let currentOperator = "plus";
let currentState = "operator";

function calcFunc() {
    switch(currentOperator){
        case "plus":
            currentValue = parseFloat(previousValue) + parseFloat(currentValue);
            break; 
        case "minus":
            currentValue = previousValue - currentValue;
            break;
        case "times":
            currentValue = previousValue * currentValue;
            break;
        case "divide":
            currentValue = previousValue / currentValue;
            break;
        default:
            break;
    }

    inputField.innerHTML = currentValue;

    console.log("previous:" , previousValue);
    console.log("current:" , currentValue);
}

function removeHighlight(){
    operatorBtn.forEach(elementBtn => {
        elementBtn.classList.remove("highlight");
    });
}

allBtn.forEach(elementBtn => {
    elementBtn.addEventListener("click", () => {
        elementBtn.classList.add("hover");
        setTimeout(() => {
            elementBtn.classList.remove("hover");
        }, 1000);
    })
})

numberBtn.forEach(elementBtn => {
    elementBtn.addEventListener("click", function () {
        removeHighlight();
        let numberValue = (elementBtn.innerHTML);
    
        if (currentState == "operator"){
            if(currentOperator == "equals"){
                previousValue = 0;
                currentOperator = "plus";
            } else {
                previousValue = currentValue;
            }
            if(numberValue == "."){
                currentValue = "0.";
            } else{
                currentValue = numberValue;
            } 
        } else {
            if(currentValue.includes(".") && numberValue == "."){
                return;
            } 
            currentValue = currentValue + numberValue;
        }
        
        inputField.innerHTML = currentValue;
        currentState = "number";

        console.log(numberValue);
    })
});

operatorBtn.forEach(elementBtn => {
    elementBtn.addEventListener("click", function () {
        removeHighlight();
        elementBtn.classList.add("highlight");

        if (currentState == "number"){
            currentState = "operator"
            calcFunc();
        } 

        let operatorValue = (elementBtn.dataset.operator);
        currentOperator = operatorValue;

        // inputValue = inputValue + operatorValue;
        // inputField.innerHTML = inputValue;



        console.log(operatorValue);
    })
});




clearBtn.addEventListener("click", function () {
    
    inputField.innerHTML = "0";
    currentValue = "0";
    previousValue = 0;
    currentOperator = "plus";
    currentState = "operator";
    removeHighlight();
});

percentBtn.addEventListener("click", () => {
    currentValue = currentValue / 100;
    inputField.innerHTML = currentValue;
})

plusminusBtn.addEventListener("click", () => {
    currentValue = currentValue * (-1);
    inputField.innerHTML = currentValue;
})

// decimalBtn.addEventListener("click", () => {
//     if(!currentValue.includes(".")){
//         currentValue += ".";
//         inputField.innerHTML = currentValue;
//     } 

// })