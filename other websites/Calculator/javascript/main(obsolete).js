const calculator = document.getElementsByClassName("calculator")[0];
const display = calculator.querySelector(".calculator__display");
const keys = calculator.querySelector(".calculator__keys");


function handleOperator (operator){
  if (calculator.dataset.secondNumber !== ""){
    calculator.dataset.previousButtonType = "equal";
    handleEqual();
  }
  calculator.dataset.operator = operator;
}

function handleNumber (number) {
  const operator = calculator.dataset.operator;
  const isFirstNumber = (operator === "");
  if (calculator.dataset.previousButtonType == "equal") handleClear();
  if (isFirstNumber){
    calculator.dataset.firstNumber += number;
    display.textContent = Number(calculator.dataset.firstNumber);
  }
  else{
    calculator.dataset.secondNumber += number;
    display.textContent = Number(calculator.dataset.secondNumber);
  }
}

function handleClear (){
  const calculatorAttributesArray = Object.keys(calculator.dataset);
  calculatorAttributesArray.forEach((attribute) => calculator.dataset[attribute] = "");
  calculator.dataset.firstNumber = 0;
  display.textContent = "0";
}


function handleDecimal(){
  if (calculator.dataset.previousButtonType == "equal") handleClear();
  if (calculator.dataset.operator === ""){
    if (!calculator.dataset.firstNumber.includes(".")){
      calculator.dataset.firstNumber+= ".";
      display.textContent+="."
    }
  }
  else{
    if (!calculator.dataset.secondNumber.includes(".")){
      calculator.dataset.secondNumber+= ".";
      display.textContent = (calculator.dataset.previousButtonType === "operator") ? "." : display.textContent + ".";
    }
  }
}

function handleEqual(){
  const firstNumber = Number(calculator.dataset.firstNumber); // Possible entries: Number;
  const secondNumber = calculator.dataset.secondNumber === "." ? 0 : ParseFloat(calculator.dataset.secondNumber); // Possible entries: Number, ".", "undefined"
  const operator = calculator.dataset.operator;
  console.log(firstNumber,operator,secondNumber);
  let result = firstNumber;

  if ((secondNumber !== undefined) && operator){
    if (operator === "+") result = firstNumber + secondNumber;
    else if (operator === "-") result = firstNumber - secondNumber;
    else if (operator === "x") result = firstNumber * secondNumber;
    else if (operator === "/") result = firstNumber / secondNumber;
  } 
  calculator.dataset.secondNumber = "";
  calculator.dataset.operator = "";
  calculator.dataset.firstNumber = result;
  display.textContent = result;
}

function changeClearButton (textContent){
  const clearButton = keys.querySelector("[data-type=clear]")
  clearButton.textContent = textContent
}

function handleKeyButton(keyButton){
  const type = keyButton.dataset.type;
  const key = keyButton.dataset.key;

  (type === "number" || type === "decimal")
    ? changeClearButton("CE") // true
    : changeClearButton("AC") // false

  if (type === "number") handleNumber(key);
  else if (type === "decimal") handleDecimal();
  else if (type === "operator") handleOperator(key);
  else if (type === "clear") handleClear();
  else if (type === "equal") handleEqual();

  calculator.dataset.previousButtonType = type;
}

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) handleKeyButton(e.target);
})