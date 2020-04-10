import { masks, currencyMask, removeMask } from '../maskService';

test('should return CPF with mask', () => {
  expect(masks.cpf('52336114062')).toBe('523.361.140-62');
});

test('should return Card Number with mask', () => {
  expect(masks.cardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
});

test('should return CEP with mask', () => {
  expect(masks.cep('11111111')).toBe('11111-111');
});

test('should return cellphone with mask', () => {
  expect(masks.phone('27999999999')).toBe('(27) 99999-9999');
});

test('should return date with DD/MM/YY format', () => {
  expect(masks.date('30041995')).toBe('30/04/1995');
});

test('should return date with MM/YY format', () => {
  expect(masks.creditCardDate('1234')).toBe('12/34');
});

test('should remove mask correctly', () => {
  expect(removeMask('(27) 99999-9999')).toBe('27999999999');
});

test('should return BRL currency', () => {
  expect(currencyMask('100')).toBe('R$ 100,00');
});

test('should remove a character when user is erasing text', () => {
  expect(masks.cpf('111.111', '111.111.')).toBe('111.111');
});

test('should return empty string if no value is passed', () => {
  expect(currencyMask()).toBe('');
});
