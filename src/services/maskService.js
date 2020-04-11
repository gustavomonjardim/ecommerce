import StringMask from 'string-mask';

const format = (value, prevValue, ...props) => {
  const valueClean = value.replace(/\D/g, '');
  if (prevValue !== undefined) {
    if (value.length <= prevValue.length) {
      return value;
    }
  }
  const formatter = new StringMask(...props);
  return formatter.apply(valueClean);
};

const masks = {
  cardNumber: (value, prevValue) => {
    return format(value, prevValue, '0000 0000 0000 0000');
  },
  cpf: (value, prevValue) => {
    return format(value, prevValue, '000.000.000-00');
  },

  phone: (value, prevValue) => {
    return format(value, prevValue, '(00) 00000-0000');
  },

  cep: (value, prevValue) => {
    return format(value, prevValue, '00000-000');
  },

  date: (value, prevValue) => {
    return format(value, prevValue, '90/90/9900');
  },

  creditCardDate: (value, prevValue) => {
    return format(value, prevValue, '00/00');
  },
};

const currencyMask = str => {
  if (str === null || str === undefined) {
    return '';
  }

  return `R$ ${parseFloat(str)
    .toFixed(2)
    .replace('.', ',')}`;
};

const removeMask = data => data?.replace(/\D/g, '');

export { currencyMask, masks, removeMask };
