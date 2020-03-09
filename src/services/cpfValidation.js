const validateCPF = param => {
  const value = param.replace(/\D/g, '');
  let sum = 0;
  let remainder;

  if (
    value === '00000000000' ||
    value === '11111111111' ||
    value === '22222222222' ||
    value === '33333333333' ||
    value === '44444444444' ||
    value === '55555555555' ||
    value === '66666666666' ||
    value === '77777777777' ||
    value === '88888888888' ||
    value === '99999999999'
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i += 1) {
    sum += Number(value.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== Number(value.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i += 1) {
    sum += Number(value.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== Number(value.substring(10, 11))) {
    return false;
  }

  if (!value) {
    return false;
  }

  return true;
};

export { validateCPF };
