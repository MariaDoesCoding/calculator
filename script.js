// Themes

let theme1 = document.getElementById("theme1");
let theme2 = document.getElementById("theme2");
let theme3 = document.getElementById("theme3");

theme1.addEventListener("click", () => {
  document.documentElement.classList.value = "theme-1";
});

theme2.addEventListener("click", () => {
  document.documentElement.classList.value = "theme-2";
});

theme3.addEventListener("click", () => {
  document.documentElement.classList.value = "theme-3";
});

// Operations and numbers

const display = document.getElementById("display");
const output = document.getElementById("output");
const numBtns = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.getElementById("reset");
const equalBtn = document.getElementById("equal");

let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

function appendNumber(number) {
  if (shouldResetDisplay) {
    output.textContent = '';
    shouldResetDisplay = false;
  }

  if (number === '.' && currentInput.includes('.')) return;

  output.textContent += number;
  currentInput = output.textContent;
}

function setOperator(operator) {
  if (currentOperator !== null) {
    if (currentInput.endsWith(' ')) return;
    evaluate();
  }
  firstOperand = parseFloat(currentInput);
  currentOperator = operator;
  shouldResetDisplay = true;
  output.textContent += ` ${operator} `;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = parseFloat(currentInput);
  if (currentOperator === '/' && secondOperand === 0) {
    output.textContent = 'Error';
    currentInput = '';
    return;
  }
  output.textContent = roundResult(operate(firstOperand, secondOperand, currentOperator));
  currentInput = output.textContent;
  currentOperator = null;
}

function operate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '/':
      return a / b;
    default:
      return null;
  }
}

function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}

function deleteLast() {
  if (output.textContent.endsWith(' ')) {
    output.textContent = output.textContent.slice(0, -3);
  } else {
    output.textContent = output.textContent.slice(0, -1);
  }
  currentInput = output.textContent;
}

function resetCalculator() {
  output.textContent = '';
  currentInput = '';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

numBtns.forEach(button => 
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operators.forEach(button =>
  button.addEventListener('click', () => setOperator(button.textContent))
);

equalBtn.addEventListener('click', evaluate);
deleteBtn.addEventListener('click', deleteLast);
resetBtn.addEventListener('click', resetCalculator);