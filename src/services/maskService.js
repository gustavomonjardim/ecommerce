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

  cnpj: (value, prevValue) => {
    return format(value, prevValue, '00.000.000/0000-00');
  },

  celular: (value, prevValue) => {
    return format(value, prevValue, '(00) 00000-0000');
  },

  telefone: (value, prevValue) => {
    return format(value, prevValue, '(00) 90000-0000');
  },

  cep: (value, prevValue) => {
    return format(value, prevValue, '00000-000');
  },

  moeda: (value, prevValue) => {
    return format(value, prevValue, '#.##0,00', { reverse: true });
  },

  data: (value, prevValue) => {
    return format(value, prevValue, '90/90/9900');
  },

  contaBancaria: (value, prevValue) => {
    return format(value, prevValue, '9999999999999990-0');
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

export { currencyMask, masks };
