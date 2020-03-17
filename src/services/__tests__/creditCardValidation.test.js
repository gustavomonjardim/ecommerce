import { validateCreditCard } from '../creditCardValidation';

test('should return true for a valid credit card', () => {
  expect(validateCreditCard('4111 1111 1111 1111')).toBeTruthy();
  expect(validateCreditCard('3111 1111 1111 1111')).toBeTruthy();
});

test('should return false for a invalid credit card', () => {
  expect(validateCreditCard('0111 1111 1111 1111')).toBeFalsy();
  expect(validateCreditCard('1111 1111 1111 1111')).toBeFalsy();
  expect(validateCreditCard('2111 1111 1111 1111')).toBeFalsy();
  expect(validateCreditCard('')).toBeFalsy();
});
