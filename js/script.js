// Login btn functionality

document.getElementById('login-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const mobileNumber = 12345678910;
  const pinNumber = 1234;
  const inputtedMobileNumber = document.getElementById('mobile-number').value;
  const inputtedMobileNumberValue = parseInt(inputtedMobileNumber);

  const inputtedPinNumber = document.getElementById('pin-number').value;
  const inputtedPinNumberValue = parseInt(inputtedPinNumber);

  if (
    inputtedMobileNumberValue === mobileNumber &&
    inputtedPinNumberValue === pinNumber
  ) {
    window.location.href = './home.html';
  } else {
    alert('Invalid Credentials');
  }
});
