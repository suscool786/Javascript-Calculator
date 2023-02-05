"use strict";

var input = document.getElementById('input'),
  number = document.querySelectorAll('.numbers div'), 
  operator = document.querySelectorAll('.operators div'),
  result = document.getElementById('result'), 
  clear = document.getElementById('clear'), 
  resultDisplayed = false; 

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input data and its last char 
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result already displayed and user entered a input
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to operators buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // processing result data
  var inputString = input.innerHTML;

  // forming an array of numbers provided as input
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators provided as input
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  /* looping on array and USing 1 operAtion at a time using BODMAS
 and store final result in array */
  
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; 
  resultDisplayed = true;
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})
