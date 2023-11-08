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

    setInputField();

    console.log("previous:" , previousValue);
    console.log("current:" , currentValue);
}

function removeHighlight(){
    operatorBtn.forEach(elementBtn => {
        elementBtn.classList.remove("highlight");
    });
}

function adjustFontSize() {
    let originalFontSize = parseInt(getComputedStyle(inputField).fontSize);
    console.log("adjustFontSize()");
    console.log("inputField.scrollWidth:", inputField.scrollWidth);
    console.log("inputField.clientWidth", inputField.clientWidth);
    while (inputField.scrollWidth > inputField.clientWidth) {
      originalFontSize--;
      inputField.style.fontSize = originalFontSize + 'px';
      console.log(originalFontSize);
    }
  }
  
function setInputField() {
    let visibleValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    inputField.innerHTML = visibleValue;
    adjustFontSize();
}

allBtn.forEach(elementBtn => {
    elementBtn.addEventListener("click", () => {
        elementBtn.classList.add("hover");
        setTimeout(() => {
            elementBtn.classList.remove("hover");
        }, 200);
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
        
        setInputField();
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
    setInputField();
})

plusminusBtn.addEventListener("click", () => {
    currentValue = currentValue * (-1);
    setInputField();
})

// decimalBtn.addEventListener("click", () => {
//     if(!currentValue.includes(".")){
//         currentValue += ".";
//         setInputField();
//     } 

// })