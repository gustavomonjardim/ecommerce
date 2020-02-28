const currencyMask = str => {
  if (str === null || str === undefined) {
    return '';
  }

  return `R$ ${parseFloat(str)
    .toFixed(2)
    .replace('.', ',')}`;
};

export { currencyMask };
