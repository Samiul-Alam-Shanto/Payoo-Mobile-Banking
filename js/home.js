const validPin = 1234;
const transactionData = [];

function getValue(id) {
  return document.getElementById(id).value;
}
function getValueNumber(id) {
  return parseInt(document.getElementById(id).value);
}
function getInnerText(id) {
  return document.getElementById(id).innerText;
}
function getInnerTextNumber(id) {
  return parseInt(document.getElementById(id).innerText);
}

function setInnerText(value) {
  document.getElementById('current-amount').innerText = value;
}

function toggleHandle(id) {
  const forms = document.getElementsByClassName('form');
  for (const form of forms) {
    form.style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
}
function toggleButton(id) {
  const formBtns = document.getElementsByClassName('form-btn');
  for (const btn of formBtns) {
    btn.classList.remove('border-[#0874f2]', 'bg-[#0874f20d]');
    btn.classList.add('border-gray-300');
  }

  document.getElementById(id).classList.remove('border-gray-300');
  document
    .getElementById(id)
    .classList.add('border-[#0874f2]', 'bg-[#0874f20d]');
}

//logout

document.getElementById('logout-btn').addEventListener('click', function () {
  window.location.href = './index.html';
});

// add money

document
  .getElementById('add-money-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();
    const bank = getValue('bank');
    const accountNumber = getValue('account-number');
    const addAmount = getValueNumber('add-amount');
    const addPin = getValueNumber('add-pin');
    const currentBalance = getInnerTextNumber('current-amount');
    const newCurrentBalance = addAmount + currentBalance;

    if (accountNumber.length < 11) {
      alert('Please Provide a valid Bank Account Number');
      return;
    }
    if (addPin !== validPin) {
      alert('Please Provide a Valid Pin Number');
      return;
    }
    setInnerText(newCurrentBalance);

    const data = {
      name: 'Add Money',
      date: new Date().toLocaleTimeString(),
    };
    transactionData.push(data);
  });

// cashout

document.getElementById('cashout-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const agentNumber = getValue('cashout-agent-number');
  const cashoutAmount = getValueNumber('cashout-amount');
  const cashoutPin = getValueNumber('cashout-pin');
  const currentBalance = getInnerTextNumber('current-amount');
  if (agentNumber.length < 11) {
    alert('Please Provide a valid Bank Account Number');
    return;
  }
  if (cashoutPin !== validPin) {
    alert('Please Provide a Valid Pin Number');
    return;
  }
  if (
    cashoutAmount <= 0 ||
    cashoutAmount > currentBalance ||
    cashoutAmount === ''
  ) {
    alert('Please enter valid amount');
    return;
  }
  const newCurrentBalance = currentBalance - cashoutAmount;

  setInnerText(newCurrentBalance);

  const data = {
    name: 'Cash Out',
    date: new Date().toLocaleTimeString(),
  };
  transactionData.push(data);
});

//transfer Money
document.getElementById('transfer-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const userAccount = getValue('transfer-account-number');
  const transferAmountValue = getValueNumber('transfer-amount');
  const transferPin = getValueNumber('transfer-pin');
  const currentBalance = getInnerTextNumber('current-amount');
  if (userAccount.length < 11) {
    alert('Provide a Valid account number');
    return;
  }

  if (transferAmountValue <= 0 || transferAmountValue > currentBalance) {
    alert('please enter correct amount');
    return;
  }
  if (transferPin !== validPin) {
    alert('Please Provide a Valid Pin Number');
    return;
  }

  const newCurrentBalance = currentBalance - transferAmountValue;
  setInnerText(newCurrentBalance);

  const data = {
    name: 'Transfer Money',
    date: new Date().toLocaleTimeString(),
  };
  transactionData.push(data);
});

//get Bonus

document.getElementById('bonus-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const coupon = 'discount';
  const bonusField = getValue('bonus-field');
  const currentBalance = getInnerTextNumber('current-amount');
  if (bonusField.toLowerCase() === coupon) {
    const newCurrentBalance = currentBalance - 1000;
    setInnerText(newCurrentBalance);
  } else {
    alert('Provide a valid cupon code');
  }

  const data = {
    name: 'Bonus',
    date: new Date().toLocaleTimeString(),
  };
  transactionData.push(data);
});

//pay Bill

document.getElementById('payBill-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const billerAccount = getValue('billerAccount-number');
  const billAmountValue = getValueNumber('payBill-amount');
  const billPin = getValueNumber('payBill-pin');
  const currentBalance = getInnerTextNumber('current-amount');
  if (billerAccount.length < 11) {
    alert('Provide a Valid account number');
    return;
  }

  if (billAmountValue <= 0 || billAmountValue > currentBalance) {
    alert('please enter correct amount');
    return;
  }
  if (billPin !== validPin) {
    alert('Please Provide a Valid Pin Number');
    return;
  }

  const newCurrentBalance = currentBalance - billAmountValue;
  setInnerText(newCurrentBalance);
  const data = {
    name: 'Bill Pay',
    date: new Date().toLocaleTimeString(),
  };
  transactionData.push(data);
});

//transaction history

document
  .getElementById('tansactions-button')
  .addEventListener('click', function () {
    const transactionCardContainer = document.getElementById(
      'transaction-card-container'
    );
    transactionCardContainer.innerHTML = '';
    const updateTransactionData = transactionData.reverse();
    for (const data of updateTransactionData) {
      const div = document.createElement('div');
      div.innerHTML = `
              <div
            class="flex justify-between items-center bg-white p-3 rounded-xl"
          >
            <div class="flex items-center">
              <div class="rounded-full bg-[#0808080d] p-3 mr-3">
                <img src="./assets/wallet1.png" alt="" />
              </div>
              <div>
                <h2 class="font-bold">${data.name}</h2>
                <p class="text-xs">${data.date}</p>
              </div>
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
    `;
      transactionCardContainer.appendChild(div);
    }
  });

//latest payments

document
  .getElementById('latest-payment-btn')
  .addEventListener('click', function () {
    const latestCardContainer = document.getElementById(
      'latest-card-container'
    );
    latestCardContainer.innerHTML = '';
    const updateTransactionData = transactionData.reverse();
    for (const data of updateTransactionData) {
      const div = document.createElement('div');
      div.innerHTML = `
              <div
            class="flex justify-between items-center bg-white p-3 rounded-xl"
          >
            <div class="flex items-center">
              <div class="rounded-full bg-[#0808080d] p-3 mr-3">
                <img src="./assets/wallet1.png" alt="" />
              </div>
              <div>
                <h2 class="font-bold">${data.name}</h2>
                <p class="text-xs">${data.date}</p>
              </div>
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
    `;
      latestCardContainer.appendChild(div);
    }
  });

// toggle start
document.getElementById('add-button').addEventListener('click', function () {
  toggleHandle('add-money-parent');
  toggleButton('add-button');
});
document
  .getElementById('cashout-button')
  .addEventListener('click', function () {
    toggleHandle('cash-out-parent');
    toggleButton('cashout-button');
  });
document
  .getElementById('transfer-button')
  .addEventListener('click', function () {
    toggleHandle('transfer-money-parent');
    toggleButton('transfer-button');
  });
document.getElementById('bonus-button').addEventListener('click', function () {
  toggleHandle('get-bonus-parent');
  toggleButton('bonus-button');
});
document
  .getElementById('payBill-button')
  .addEventListener('click', function () {
    toggleHandle('pay-bill-parent');
    toggleButton('payBill-button');
  });
document
  .getElementById('tansactions-button')
  .addEventListener('click', function () {
    toggleHandle('transactions-parent');
    toggleButton('tansactions-button');
  });
//latest payment

document
  .getElementById('latest-payment-btn')
  .addEventListener('click', function () {
    toggleHandle('latest-parent');
  });
