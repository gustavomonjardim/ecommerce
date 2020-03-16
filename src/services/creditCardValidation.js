function validateCreditCard(cardNumber) {
  if (!cardNumber || cardNumber.length < 16) {
    return false;
  }
  if (cardNumber[0] === '0' || cardNumber[0] === '1' || cardNumber[0] === '2') {
    return false;
  }
  return true;
}

export { validateCreditCard };
