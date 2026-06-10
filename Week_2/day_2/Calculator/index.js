function allOperators(operation) {
  let firstNum = Number(document.getElementById("number1").value);
  let secondNum = Number(document.getElementById("number2").value);

  if (operation == "+") {
    document.getElementById("operators").innerHTML =
      "Addition of 1 num & 2 num: " + (firstNum + secondNum);
  } else if (operation == "-") {
    document.getElementById("operators").innerHTML =
      "Subtraction of 1 num & 2 num: " + (firstNum - secondNum);
  } else if (operation == "*") {
    document.getElementById("operators").innerHTML =
      "Multiplication of 1 num & 2 num: " + firstNum * secondNum;
  } else {
    document.getElementById("operators").innerHTML =
      "Division of 1 num & 2 num: " + (firstNum / secondNum);
  }
}
