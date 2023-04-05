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
    return delay(1250).then(() => display.textContent = "");
  }
  if (b === 0 && divideByZeroAlert === true) {
    alert("This may be your final warning!");
    finalDivideByZeroAlert = true;
    display.textContent = "It's me..."
    delay(1000).then(() => display.textContent = "HAL 9000!");
    return delay(2000).then(() => display.textContent = "");
  }
  if (b === 0) {
    alert("Oh don't you dare"); 
    divideByZeroAlert = true;
    display.textContent = "Hello, World!";
    return delay(1000).then(() => display.textContent = "");
  }
  display.textContent = Math.round((a / b + Number.EPSILON) * 1000) / 1000;
  console.log(`${a} / ${b} = ${a / b}`);
  displayValue = (a / b);
  numberOne /= numberTwo;
  numberTwo = 0;
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
}

// variables used for calculator logic
let afterNumber = false; // checks if last button pressed is a number
let numberOne = 0; // first number to run in operate function
let numberTwo = 0; // second number to run in operate function
let operator = ""; // string that runs in operate function
let operatorOn = false; // used for operator (+,-,*,/) logic
let afterOperate = false; // used to reset the display if a number is pressed 
                          // after an operation
let displayValue = ""; // calculator screen display
let afterDecimal = false; // don't allow more than one decimal


const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // listening for numbers (0 through 9)
    if (button.id >= "0" && button.id <= "9") {
      if (afterOperate === true) {
        displayValue = "";
        afterOperate = false;
      }
      afterNumber = true;
      displayValue += button.id;
      return display.textContent = displayValue;
    }
    // listening for operators (+, -, *, /)
    if (button.id === "+" || button.id === "-" || button.id === "*" || 
        button.id === "/") 
    {
      if (operatorOn === false) {
        afterDecimal = false;
        afterNumber = false;
        numberOne = Number(displayValue);
        operatorOn = true;
        operator = button.id;
        displayValue = ""; 
        // the following else if statement is to let the user string multiple 
        // operations together (for example, 12 + 7 - 5 * 3 = 42)
      } else if (operatorOn === true && afterNumber === true) {
        afterDecimal = false;
        afterNumber = false;
        numberTwo = Number(displayValue);
        afterOperate = true;
        operate(operator, numberOne, numberTwo);
        operator = button.id;
      } else if (operatorOn === true && afterNumber === false) {
        operator = button.id; // this else if statement allows user to switch 
        // from previous operator choice to next operator (when multiple 
        // operators are pressed consecutively - for example, pressing 1,-,+,3 
        // will equal 1 + 3 = 4)
      }
    }
    switch (button.id) {
      case "c": // clear button
        afterNumber = false;
        numberOne = 0; 
        numberTwo = 0;
        operator = "";
        operatorOn = false;
        afterOperate = false;
        afterDecimal = false;
        displayValue = "";
        display.textContent = displayValue;
        break;     
      case "Enter": // "=" sign button
        if (operatorOn === true) {
          afterDecimal = false;
          operatorOn = false;
          numberTwo = Number(displayValue);
          afterOperate = true;
          operate(operator, numberOne, numberTwo);
        }
        break;
      case ".": // decimal button
        if (afterDecimal === false) {
          afterDecimal = true;
          if (afterOperate === true) {
            displayValue = "";
            afterOperate = false;
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
        if (afterOperate === true) {
          displayValue = "";
          display.textContent = displayValue;
        } else if (displayValue.charAt(displayValue.length - 1) === ".") {
            afterDecimal = false;
            displayValue = displayValue.slice(0, -1);
            display.textContent = displayValue;
        } else if (displayValue !== "") {
            displayValue = displayValue.slice(0, -1);
            display.textContent = displayValue;
        }
        break;
    }
  });
});

// Keyboard support ('keydown' simulates html button press/click)
window.addEventListener('keydown', function (e) {
  if (e.key >= "0" && e.key <= "9" || e.key === "c" || e.key === "+" || 
      e.key === "-" || e.key === "*" || e.key === "/" || e.key === "Enter" || 
      e.key === "." || e.key === "Backspace") 
  {
      this.document.getElementById(e.key).click();
  }
});