const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator__display");
const keys = calculator.querySelector(".calculator__keys");

function resetDisplay(){
  display.textContent = "0";
}

function resetCalculator(){
  display.textContent = "0";
  calculator.dataset.operator = "";
  calculator.dataset.firstNumber = "";
}

function calculate(){
  const firstNumber = parseFloat(calculator.dataset.firstNumber);
  const secondNumber = parseFloat(display.textContent);
  const operator = calculator.dataset.operator;

  // TODO: Can be improved?
  let newResult = secondNumber // If there is no other number, i only can work with the one in the display
  if (operator){ // If there is an operator, there is another number too, besides the one in the display
    if (operator === "+") newResult = firstNumber + secondNumber;
    else if (operator === "-") newResult = firstNumber - secondNumber;
    else if (operator === "x") newResult = firstNumber * secondNumber;
    else if (operator === "/") newResult = firstNumber / secondNumber;
  }
  return newResult;
}

function handleKey(button){
  const {type, key} = button.dataset;
  const {previousButtonType} = calculator.dataset;
  const newNumber = previousButtonType === "operator" || previousButtonType === "equal";

  if (type === "number"){
    if (display.textContent === "0" || newNumber)   // If zero only, replace it, if not, add the number to the displayed one
      display.textContent = key;
    else
      display.textContent += key;
  }

  if (type === "decimal"){
    // If already one decimal in display, don't add another
    if (newNumber) display.textContent = "0.";
    else if (!display.textContent.includes(".")) display.textContent += ".";
  }

  if (type === "operator"){
    if (!(previousButtonType === "operator" || previousButtonType === "equal")) display.textContent = calculate();
    calculator.dataset.firstNumber = display.textContent;
    calculator.dataset.operator = key;
  }

  if (type === "equal"){
    if (previousButtonType === "equal")
      display.textContent = calculator.dataset.modifierValue;
    else
      calculator.dataset.modifierValue = display.textContent;
      
    display.textContent = calculate();

    calculator.dataset.firstNumber = display.textContent;
  }

  if (type === "clear"){
    if (button.textContent === "AC"){
      calculator.dataset.firstNumber = "";
      calculator.dataset.operator = "";
      calculator.dataset.modifierValue = "";
      display.textContent = "0";
    } else if (button.textContent === "CE") resetDisplay();
  }

  // Change clear button display letters and functionality
  if (type === "number" || type === "decimal")
    keys.querySelector("[data-type=clear]").textContent = "CE"
  else
    keys.querySelector("[data-type=clear]").textContent = "AC"

  calculator.dataset.previousButtonType = type;
}


keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) handleKey(e.target);
})