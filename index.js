const numberBtn = document.querySelectorAll(".numbers");
const operatorBtn = document.querySelectorAll(".operators");
const sciOperatorBtn = document.querySelectorAll(".sci-operators");
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
        case "pwr":
            currentValue = previousValue**currentValue
        default:
            break;
    }

    setInputField();

    console.log("previous:" , previousValue);
    console.log("current:" , currentValue);
}

function calculateSine(){
    const angleInRadians = (currentValue * Math.PI) / 180;
    const sineValue = Math.sin(angleInRadians).toFixed(10);
    currentValue = sineValue;
}

function calculateCos(){
    const angleInRadians = (currentValue * Math.PI) / 180;
    const cosValue = Math.cos(angleInRadians).toFixed(10);
    currentValue = cosValue;
}

function calculateTan(){
    const angleInRadians = (currentValue * Math.PI) / 180;
    const tanValue = Math.tan(angleInRadians).toFixed(10);
    currentValue = tanValue;
}

function calculateTanh() {
    const ex = Math.exp(currentValue);
    const emx = Math.exp(-currentValue);
    currentValue = (ex - emx) / (ex + emx);
  }


function factorial(){
    let result = 1;

    for (let i = 1; i <= currentValue; i++) {
      result *= i;
    }
    currentValue = result;
}

// fix rounding with sin,cos,tan
// fix highlight on operators
// pi and e should erase each other
// pressing sci-operators should be like =

function sciCalcFunc() {
    switch(currentOperator) {
        case "log":
            currentValue = Math.log(currentValue) / Math.log(10);
            break;
        case "ln":
            currentValue = Math.log(currentValue);
            break;
        case "sqr":
            currentValue = currentValue**2;
            break;
        case "cube":
            currentValue = currentValue**3;
            break;
        case "e-pwr":
            currentValue = 2.718281828459045**currentValue;
            break;
        case "sqrt":
            currentValue = currentValue**(1/2);
            break;
        case "cbrt":
            currentValue = currentValue**(1/3);
            break;
        case "ten-pwr":
            currentValue = 10**currentValue;
            break;
        case "factorial":
            factorial();
            break;
        case "sin":
            calculateSine();
            break;
        case "cos":
            calculateCos();
            break;
        case "tan":
            calculateTan();
            break;
        case "sinh":
            currentValue = (Math.exp(currentValue) - Math.exp(-currentValue)) / 2;
            break;
        case "cosh":
            currentValue = (Math.exp(currentValue) + Math.exp(-currentValue)) / 2;
            break;
        case "tanh":
            calculateTanh();
            break;
        default:
            break;
    }

    setInputField();
}

function removeHighlight(){
    operatorBtn.forEach(elementBtn => {
        elementBtn.classList.remove("highlight");
    });
}

function adjustFontSize() {
    let originalFontSize = parseInt(getComputedStyle(inputField).fontSize);

    console.log("inputField.scrollWidth:", inputField.scrollWidth);
    console.log("inputField.clientWidth", inputField.clientWidth);

    if (inputField.scrollWidth > inputField.clientWidth){
        while (inputField.scrollWidth > inputField.clientWidth) {
            originalFontSize--;
            inputField.style.fontSize = originalFontSize + 'px';
          }
    } else {
        inputField.style.fontSize = '100px';
    }
    
    console.log('final font size:', inputField.style.fontSize);
    console.log('originalFontSize', originalFontSize);
  }
  
function setInputField() {
    // let visibleValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let visibleValue = currentValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    , ",");
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
        
        let numberValue;

        if(elementBtn.dataset.number == "pi"){
            numberValue = 3.14159265359;
        } else if (elementBtn.dataset.number == "e"){
            numberValue = 2.718281828459045;
        } else {
            numberValue = (elementBtn.innerHTML);
        }

        

        if (currentValue == 0 && numberValue == 0){
            return;
        }
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
            if(currentValue == 0 && currentValue.includes(".")) {
                currentValue = currentValue + numberValue;                 
            }else if (currentValue == 0 ){
                currentValue = numberValue;
            } else {
                currentValue = currentValue + numberValue;
            }
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

        console.log(operatorValue);
    })
});

sciOperatorBtn.forEach(elementBtn => {
    elementBtn.addEventListener("click", () => {

        let operatorValue = (elementBtn.dataset.operator);
        currentOperator = operatorValue;
        sciCalcFunc();

    })
})


clearBtn.addEventListener("click", function () {
    
    inputField.innerHTML = "0";
    currentValue = "0";
    previousValue = 0;
    currentOperator = "plus";
    currentState = "operator";
    removeHighlight();
    adjustFontSize();
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