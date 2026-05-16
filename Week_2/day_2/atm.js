let balance = 10000;

const displayPrompt = document.getElementById("displayPrompt");
const amountInput = document.getElementById("amount");

function moneyWithdraw() {
  const withdrawAmount = Number(amountInput.value);
  
  // Control Statement (if-else conditional with Arthimetic (+, %) & Comparison assignments (==))
  if (withdrawAmount % 100 == 0) {
    const pinCode = 1234;
    const withdrawPin = Number(prompt("Enter withdraw Pin Number: "));

    if (withdrawPin == pinCode) {
      displayPrompt.innerHTML = `Balance: ${balance - withdrawAmount}`;
    } else {
      displayPrompt.innerHTML = `Invalid Pin`;
    }
  } else {
    displayPrompt.innerHTML = `Amount must be a multiple of 100`;
  }
}

function moneyDeposit() {
  const depositAmount = Number(amountInput.value);
  if (depositAmount % 100 == 0) {
    const pinCode = 5678;
    const depositPin = Number(prompt("Enter Deposit Pin Number: "));

    if (depositPin === pinCode) {
      displayPrompt.innerHTML = `Balance: ${balance + depositAmount}`;
    } else {
      displayPrompt.innerHTML = `Invalid Pin`;
    }
  } else {
    displayPrompt.innerHTML = `Amount must be a multiple of 100`;
  }
}
