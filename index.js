const display = document.querySelector("h3");

// Number.EPSILON used for more accurate rounding
function add(a, b) {
  display.textContent = Math.round((a + b + Number.EPSILON) * 1000) / 1000;
  console.log(`${a} + ${b} = ${a + b}`);
  displayValue = (a + b);
  numberOne += numberTwo;
  numberTwo = 0;
}

function subtract(a, b) {
  display.textContent = Math.round((a - b + Number.EPSILON) * 1000) / 1000;
  console.log(`${a} - ${b} = ${a - b}`);
  displayValue = (a - b);
  numberOne -= numberTwo;
  numberTwo = 0;
}

function multiply(a, b) {
  display.textContent = Math.round((a * b + Number.EPSILON) * 1000) / 1000;
  console.log(`${a} * ${b} = ${a * b}`);
  displayValue = (a * b);
  numberOne *= numberTwo;
  numberTwo = 0;
}

// snarky error messages if user repeatedly tries to divide by zero
let divideByZeroAlert = false;
let finalDivideByZeroAlert = false;
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function divide(a, b) {
  if (b === 0 && divideByZeroAlert === true && finalDivideByZeroAlert === true) {
    alert("If it's a loop you want, then it's a loop you'll get!");
    divideByZeroAlert = false;
    finalDivideByZeroAlert = false;
    display.textContent = "for (;;) {}"
    return delay(750).then(() => display.textContent = "");
  }
  if (b === 0 && divideByZeroAlert === true) {
    alert("This may be your final warning!");
    finalDivideByZeroAlert = true;
    display.textContent = "It's me, HAL 9000"
    return delay(750).then(() => display.textContent = "");
  }
  if (b === 0) {
    alert("Oh don't you dare"); 
    divideByZeroAlert = true;
    display.textContent = "Hello, World!";
    return delay(350).then(() => display.textContent = "");
  }
  display.textContent = Math.round((a / b + Number.EPSILON) * 1000) / 1000;
  console.log(`${a} / ${b} = ${a / b}`);
  displayValue = (a / b);
  numberOne /= numberTwo;
  numberTwo = 0;
}

// variables used for calculator logic
let afterNumber = false; // checks if last button pressed is a number
let numberOne = 0; // first number to run in operate function
let numberTwo = 0; // second number to run in operate function
let operator = false; // string that runs in operate function
let operatorOn = false; // used for operator (+,-,*,/) logic
let afterEqual = false; // used to reset the display if a number is pressed 
                        // after the "=" button
let displayValue = ""; // calculator screen display
let afterDecimal = false; // don't allow more than one decimal

function operate(operator, num1, num2) {
  if (operator === "add") {
    return add(num1, num2);
  } else if (operator === "subtract") {
    return subtract(num1, num2);
  } else if (operator === "multiply") {
    return multiply(num1, num2);
  } else if (operator === "divide") {
    return divide(num1, num2);
  }
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "0":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "0";
        display.textContent = displayValue;
        break;
      case "1":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "1";
        display.textContent = displayValue;
        break;    
      case "2":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "2";
        display.textContent = displayValue;
        break;  
      case "3":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "3";
        display.textContent = displayValue;
        break;  
      case "4":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "4";
        display.textContent = displayValue;
        break;  
      case "5":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "5";
        display.textContent = displayValue;
        break;       
      case "6":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "6";
        display.textContent = displayValue;
        break;    
      case "7":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "7";
        display.textContent = displayValue;
        break;      
      case "8":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "8";
        display.textContent = displayValue;
        break;  
      case "9":
        if (afterEqual === true) {
          displayValue = "";
          afterEqual = false;
        }
        afterNumber = true;
        displayValue += "9";
        display.textContent = displayValue;
        break;     
      case "c":
        afterNumber = false;
        numberOne = 0; 
        numberTwo = 0;
        operator = false;
        operatorOn = false;
        afterEqual = false;
        afterDecimal = false;
        displayValue = "";
        display.textContent = displayValue;
        break;     
      case "+":
        if (operatorOn === false) {
          afterDecimal = false;
          afterNumber = false;
          numberOne = Number(displayValue);
          operatorOn = true;
          operator = "add";
          displayValue = ""; 
          // the following else if statement is to let the user string multiple 
          // operations together (for example, 12 + 7 - 5 * 3 = 42)
        } else if (operatorOn === true && afterNumber === true) {
          afterDecimal = false;
          afterNumber = false;
          numberTwo = Number(displayValue);
          afterEqual = true;
          operate(operator, numberOne, numberTwo);
          operator = "add";
        } else if (operatorOn === true && afterNumber === false) {
          operator = "add"; // this else if statement allows user to switch from 
          //previous operator choice to "add" operator (for example, pressing 
          //1,-,+,3 will equal 1 + 3 = 4)
        }
        break;
      case "-":
        if (operatorOn === false) {
          afterDecimal = false;
          afterNumber = false;
          numberOne = Number(displayValue);
          operatorOn = true;
          operator = "subtract";
          displayValue = "";
        } else if (operatorOn === true && afterNumber === true) {
          afterDecimal = false;
          afterNumber = false;
          numberTwo = Number(displayValue);
          afterEqual = true;
          operate(operator, numberOne, numberTwo);
          operator = "subtract";
        } else if (operatorOn === true && afterNumber === false) {
          operator = "subtract";
        }
        break;  
      case "x":
        if (operatorOn === false) {
          afterDecimal = false;
          afterNumber = false;
          numberOne = Number(displayValue);
          operatorOn = true;
          operator = "multiply";
          displayValue = "";
        } else if (operatorOn === true && afterNumber === true) {
          afterDecimal = false
          afterNumber = false;
          numberTwo = Number(displayValue);
          afterEqual = true;
          operate(operator, numberOne, numberTwo);
          operator = "multiply";
        } else if (operatorOn === true && afterNumber === false) {
            operator = "multiply";
        }
        break;   
      case "/":
        if (operatorOn === false) {
          afterDecimal = false;
          afterNumber = false;
          numberOne = Number(displayValue);
          operatorOn = true;
          operator = "divide";
          displayValue = "";
        } else if (operatorOn === true && afterNumber === true) {
          afterDecimal = false;
          afterNumber = false;
          numberTwo = Number(displayValue);
          afterEqual = true;
          operate(operator, numberOne, numberTwo);
          operator = "divide";
        } else if (operatorOn === true && afterNumber === false) {
          operator = "divide";
        }
        break; 
      case "Enter":
        if (operatorOn === true) {
          afterDecimal = false;
          operatorOn = false;
          numberTwo = Number(displayValue);
          afterEqual = true;
          operate(operator, numberOne, numberTwo);
        }
        break;
      case ".":
        if (afterDecimal === false) {
          afterDecimal = true;
          if (afterEqual === true) {
            displayValue = "";
            afterEqual = false;
          }
          if (displayValue === "") {
            displayValue = "0.";
            return display.textContent = displayValue;
          }
          displayValue += ".";
          display.textContent = displayValue;
        }
        break;
      case "Backspace":
        if (afterEqual === true) {
          displayValue = "";
          return display.textContent = displayValue;
        }
        if (displayValue !== "") {
          displayValue = displayValue.slice(0, -1);
          display.textContent = displayValue;
        }
        break;
    }
  });
});

// Keyboard support ('keydown' simulates html button press)
window.addEventListener('keydown', function (e) {
  if (e.key >= "0" && e.key <= "9" || e.key === "c" || e.key === "+" || 
      e.key === "-" || e.key === "x" || e.key === "/" || e.key === "Enter" || 
      e.key === "." || e.key === "Backspace") 
  {
      this.document.getElementById(e.key).click();
  }
});

// to do: 
// decimal button (disable the decimal button if there’s already one in the 
// display) **DONE**
// round decimals **DONE**
// display snarky error message for divide by 0 **DONE**
// use CSS to make calculator look nice
// add backspace button **DONE**
// add keyboard support **DONE**

