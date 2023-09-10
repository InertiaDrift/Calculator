document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const result = document.getElementById("result");
    let currentInput = "";
    let currentOperator = "";
    let previousInput = "";
    let newCalculation = true;
  
    // Add click event listeners to all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const buttonValue = button.value;
        switch (button.dataset.type) {
          case "number":
            if (!newCalculation) {
              clearAll();
              newCalculation = true;
            }
            currentInput += buttonValue;
            userInput.textContent += buttonValue;
            break;
          case "operator":
            if (currentInput !== "") {
              if (previousInput !== "") {
                calculate();
                userInput.textContent = result.textContent; // Display result after calculation
                previousInput = result.textContent;
              } else {
                previousInput = currentInput;
              }
              currentInput = "";
              currentOperator = buttonValue;
              userInput.textContent += " " + currentOperator + " ";
            }
            break;
          case "equal":
            if (currentInput !== "" && currentOperator !== "") {
              calculate();
              newCalculation = false;
            }
            break;
          case "reset":
            clearAll();
            break;
          case "backspace":
            currentInput = currentInput.slice(0, -1);
            userInput.textContent = userInput.textContent.slice(0, -1);
            break;
          case "decimal":
            if (!currentInput.includes(".") && currentInput !== "") {
              currentInput += buttonValue;
              userInput.textContent += buttonValue;
            }
            break;
          default:
            break;
        }
      });
    });
  
    // Function to perform calculations
    function calculate() {
      const num1 = parseFloat(previousInput);
      const num2 = parseFloat(currentInput);
      let resultValue;
      switch (currentOperator) {
        case "+":
          resultValue = num1 + num2;
          break;
        case "-":
          resultValue = num1 - num2;
          break;
        case "*":
          resultValue = num1 * num2;
          break;
        case "/":
          if (num2 !== 0) {
            resultValue = num1 / num2;
          } else {
            resultValue = "Error";
          }
          break;
        case "%":
          resultValue = num1 % num2;
          break;
        default:
          break;
      }
      result.textContent = resultValue;
      currentInput = resultValue.toString();
      currentOperator = "";
    }
  
    // Function to clear all
    function clearAll() {
      currentInput = "";
      currentOperator = "";
      previousInput = "";
      userInput.textContent = "";
      result.textContent = "";
    }
  });
  