

let numberButtons = document.querySelectorAll(".buttons > .number");
let display = document.querySelector(".display");
let operatorButtons = document.querySelectorAll(".buttons > .operator")
let equalsButton = document.querySelector(".buttons > .equals")
let clearButton = document.querySelector(".buttons > .clearAll")

let displayArray = [];
let currOperand = 0;
let prevOperand;
let operator;
let result;
display.textContent = 0;

function clearAll () {
    displayArray = [];
    currOperand = 0;
    prevOperand = undefined;
    operator = undefined;
    result = undefined;
    display.textContent = currOperand;
}

function checkStatus() {
    console.log(display.textContent)
    console.log(displayArray)
    console.log({result});
    console.log({currOperand});
    console.log({operator});
    console.log({prevOperand});
}


console.log("default state");
checkStatus()


clearButton.addEventListener("click", clearAll)



numberButtons.forEach ((button) => {
    button.addEventListener("click", () => {
        if (currOperand === 0 && button.textContent === '.') {
            displayArray[0] = 0;
        };
        if (button.textContent === "." && displayArray.includes(".")) return;

        displayArray.push(button.textContent);
        currOperand = parseFloat(displayArray.join(''));
        display.textContent = displayArray.join('');

        if (prevOperand !== undefined && currOperand !== undefined) {
            operate();
        }    

        console.log("numberButton")
        checkStatus()
    })
    
})



operatorButtons.forEach((button => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        if (result !== undefined) {
            prevOperand = result;
            display.textContent = result;
        } else {prevOperand = currOperand};

        if (currOperand === undefined) {
            return;
        } else {
            currOperand = undefined;
            displayArray = [];
            console.log("operatorButton");
            checkStatus()
        }
    })
}))


let operate = () => {
    switch (operator) {
        case '/':
            result = prevOperand / currOperand;
            break;
        case '*':
            result = prevOperand * currOperand;
            break;
        case '-':
            result = prevOperand - currOperand;
            break;
        case '+':
            result = prevOperand + currOperand;
            break;
    }
    result = result.toFixed(2);
}



equalsButton.addEventListener("click", () => {
    if (prevOperand === undefined &&
        operator === undefined &&
        result === undefined &&
        currOperand !== null) {
            return;
        }
    if (currOperand === undefined) {
        return;
    }
    display.textContent = result;
    currOperand = result;
    prevOperand = undefined;
    operator = undefined;
    result = undefined;
    displayArray = [];
    checkStatus()
})