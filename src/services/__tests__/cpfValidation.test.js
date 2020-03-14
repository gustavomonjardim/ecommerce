import { validateCPF } from '../cpfValidation';

test('should return true for a valid CPF', () => {
  expect(validateCPF('523.361.140-62')).toBeTruthy();
  expect(validateCPF('928.020.500-52')).toBeTruthy();
});

test('should return false for a invalid CPF', () => {
  expect(validateCPF('111.111.111-11')).toBeFalsy();
  expect(validateCPF('123.456.789.00')).toBeFalsy();
  expect(validateCPF('169.618.337-09')).toBeFalsy();
  expect(validateCPF('177.345.324-93')).toBeFalsy();
  expect(validateCPF('00135829304')).toBeFalsy();
  expect(validateCPF('')).toBeFalsy();
});
