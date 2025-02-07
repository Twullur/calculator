
let numberButtons = document.querySelectorAll(".buttons > .number");
let display = document.querySelector(".display");
let operatorButtons = document.querySelectorAll(".buttons > .operator");
let equalsButton = document.querySelector(".buttons > .equals");
let clearButton = document.querySelector(".buttons > .clearAll");
let percentButton = document.querySelector(".buttons > .percent");
let posNegButton = document.querySelector(".buttons > .posNeg");
let backSpaceButton = document.querySelector(".buttons > .backSpace");

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
    console.log(displayArray.length)
    console.log({result});
    console.log({currOperand});
    console.log({operator});
    console.log({prevOperand});
}


console.log("default state");
checkStatus()


clearButton.addEventListener("click", clearAll)

backSpaceButton.addEventListener("click", () => {
    if (currOperand === 0) {
        return;
    } else if (currOperand > 0 && currOperand < 10){
        currOperand = 0;
        displayArray = [];
        display.textContent = 0;
        checkStatus();
        return;
    } else {
        let displayNumberString = currOperand.toString();
        displayArray = displayNumberString.split('')
        displayArray.pop();
        display.textContent = displayArray.join('');
        currOperand = parseFloat(display.textContent);
        console.log("backSpacebutton")
        checkStatus();
    }
    
})

percentButton.addEventListener("click", () => {
    if (currOperand === undefined) {
        alert("specify the second operand first")
        return;}
    currOperand = parseFloat((currOperand/100).toFixed(10));
    display.textContent = currOperand;
    console.log("percentButton")
    checkStatus()
    operate();
    
})

posNegButton.addEventListener("click", () => {
    if (currOperand === undefined) {
        alert("specify the second operand first")
        return;
    } else {currOperand = currOperand * -1};

    display.textContent = currOperand;
    if (prevOperand !== undefined && operator !== undefined) {
        operate();
    };
    
    console.log("posNeg")
    checkStatus()
})

numberButtons.forEach ((button) => {
    button.addEventListener("click", () => {
        if (currOperand === 0 && button.textContent === '0') {
            return;
        }

        if (button.textContent === "." && displayArray.includes(".")) return;
        
        if (currOperand === 0 && button.textContent === '.') {
            displayArray[0] = 0;
        };       

        if (displayArray.length === 0 && button.textContent === '.') {
            displayArray[0] = 0;
        }

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
        if (currOperand === undefined) {
            operator = button.textContent; 
            checkStatus()
            return;
        }
        
        operator = button.textContent;

        if (result !== undefined) {
            prevOperand = result;
            display.textContent = result;
        } else {prevOperand = currOperand};


        currOperand = undefined;
        displayArray = [];
        console.log("operatorButton");
        checkStatus()
    })
}))


let operate = () => {
    switch (operator) {
        case '/':
            if (currOperand === 0) {
                result = "ERROR!";
                return;
            }
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
    result = parseFloat(result.toFixed(2));
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
    checkStatus();
})

