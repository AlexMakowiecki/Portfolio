function pressKeys(keysArray){
  keysArray.forEach(key => {
    document.querySelector(`[data-key="${key}"]`).click()})
}

function resetCalculator(){
  const clearButton = keys.querySelector("[data-type=clear]");
  for (i=1;i<=2;i++) clearButton.click();
}

function getDisplayedValue(){
  return display.textContent;
}

function getCalculation(number1, operator, number2){
  if (operator === "+") return number1+number2;
  if(operator === "-") return number1-number2;
  if(operator === "x") return number1*number2;
  if(operator === "/") return number1/number2;
}

function individualTest(testVariables){
  const {result, message, keys} = testVariables;
  pressKeys(keys);
  console.assert(getDisplayedValue() === result, testVariables)
  resetCalculator();
}


// Test Suites
const tests = [
  // Initial Expressions
  {
    message: 'Number key',
    keys: ['2'],
    result: '2'
  }, {
    message: 'Number Number',
    keys: ['3', '5'],
    result: '35'
  }, {
    message: 'Number Decimal',
    keys: ['4', 'decimal'],
    result: '4.'
  }, {
    message: 'Number Decimal Number',
    keys: ['4', 'decimal', '5'],
    result: '4.5'
  },

  // Calculations
  {
    message: 'Addition',
    keys: ['2', '+', '5', 'equal'],
    result: '7'
  }, {
    message: 'Subtraction',
    keys: ['5', '-', '9', 'equal'],
    result: '-4'
  }, {
    message: 'Multiplication',
    keys: ['4', 'x', '8', 'equal'],
    result: '32'
  }, {
    message: 'Division',
    keys: ['5', '/', '1', '0', 'equal'],
    result: '0.5'
  },

  // Easy Edge Cases
  // Number keys first
  {
    message: 'Number Equal',
    keys: ['5', 'equal'],
    result: '5'
  }, {
    message: 'Number Decimal Equal',
    keys: ['2', 'decimal', '4', '5', 'equal'],
    result: '2.45'
  },

  // Decimal keys first
  {
    message: 'Decimal key',
    keys: ['decimal'],
    result: '0.'
  }, {
    message: 'Decimal Decimal',
    keys: ['2', 'decimal', 'decimal'],
    result: '2.'
  }, {
    message: 'Decimal Decimal',
    keys: ['2', 'decimal', '5', 'decimal', '5'],
    result: '2.55'
  }, {
    message: 'Decimal Equal',
    keys: ['2', 'decimal', 'equal'],
    result: '2'
  },

  // Equal key first
  {
    message: 'Equal',
    keys: ['equal'],
    result: '0'
  }, {
    message: 'Equal Number',
    keys: ['equal', '3'],
    result: '3'
  }, {
    message: 'Number Equal Number',
    keys: ['5', 'equal', '3'],
    result: '3'
  }, {
    message: 'Equal Decimal',
    keys: ['equal', 'decimal'],
    result: '0.'
  }, {
    message: 'Number Equal Decimal',
    keys: ['5', 'equal', 'decimal'],
    result: '0.'
  }, {
    message: 'Calculation + Operator',
    keys: ['1', '+', '1', 'equal', '+', '1', 'equal'],
    result: '3'
  },

  // Operator Keys first
  {
    message: 'Operator Decimal',
    keys: ['x', 'decimal'],
    result: '0.'
  }, {
    message: 'Number Operator Decimal',
    keys: ['5', 'x', 'decimal'],
    result: '0.'
  }, {
    message: 'Number Operator Equal',
    keys: ['7', '/', 'equal'],
    result: '1'
  }, {
    message: 'Number Operator Operator',
    keys: ['9', 'x', '/'],
    result: '9'
  },

  // Difficult edge cases
  // Operator calculation
  {
    message: 'Operator calculation',
    keys: ['9', '+', '5', '+'],
    result: '14'
  }, {
    message: 'Operator follow-up calculation',
    keys: ['1', '+', '2', '+', '3', '+', '4', '+', '5', '+'],
    result: '15'
  },

  // Equal followup calculation
  {
    message: 'Number Operator Equal Equal',
    keys: ['9', '-', 'equal', 'equal'],
    result: '-9'
  }, {
    message: 'Number Operator Number Equal Equal',
    keys: ['8', '-', '5', 'equal', 'equal'],
    result: '-2'
  }
];

tests.forEach(test => individualTest(test));