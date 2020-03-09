import moment from 'moment';

const parseAndFormatDateService = (date, originalFormat, format) =>
  moment(date, originalFormat).format(format);

const timeFromDate = date => moment().diff(moment(date), 'year');

const validateBirthdate = date => {
  const parsedDate = parseAndFormatDateService(date, 'DD/MM/YYYY', 'YYYY-MM-DD');
  const years = timeFromDate(parsedDate);

  if (years < 18) {
    return false;
  }
  return true;
};

const validateExpirationDate = date => {
  const parsedDate = moment(date, 'MM/YY');
  if (moment() > parsedDate) {
    return false;
  }
  return true;
};

const getFutureDate = (daysToAdd, format) =>
  moment()
    .add(daysToAdd, 'days')
    .locale('pt-br')
    .format(format);

export { validateExpirationDate, validateBirthdate, parseAndFormatDateService, getFutureDate };
