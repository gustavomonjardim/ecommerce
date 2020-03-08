import moment from 'moment';

const parseAndFormatDateService = (date, originalFormat, format) =>
  moment(date, originalFormat).format(format);

const timeFromDate = date => moment().diff(moment(date), 'year');

const validateBirthdate = param => {
  const date = parseAndFormatDateService(param, 'DD/MM/YYYY', 'YYYY-MM-DD');

  if (date.length === 10) {
    const years = timeFromDate(date);

    if (years < 18) {
      return false;
    }
    return true;
  }

  return false;
};

export { validateBirthdate, parseAndFormatDateService };
