let amount = 10000;

function moneyWithdraw() {
  let money = Number(document.getElementById("amount").value);

  if (money % 100 == 0) {
    const pinCode = 1234;
    let withdrawPin = Number(prompt("Enter withdraw Pin Number: "));

    if (withdrawPin == pinCode) {
      document.getElementById("heading").innerHTML =
        `Balance: ${amount - money}`;
    } else {
      document.getElementById("heading").innerHTML = `Invalid Pin Code`;
    }
  } else {
    document.getElementById("heading").innerHTML =
      `Amount must be a multiple of 100`;
  }
}

function moneyDeposit() {
  let money = Number(document.getElementById("amount").value);

  if (money % 100 == 0) {
    const pinCode = 5678;
    let depositPin = Number(prompt("Enter Deposit Pin Number: "));
    if (depositPin === pinCode) {
      document.getElementById("heading").innerHTML =
        `Balance: ${amount + money}`;
    } else {
      document.getElementById("heading").innerHTML = `Invalid Pin Code`;
    }
  } else {
    document.getElementById("heading").innerHTML =
      `Amount must be a multiple of 100`;
  }
}
