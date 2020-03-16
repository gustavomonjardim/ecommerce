import pagarme from 'pagarme';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export async function handler(event) {
  console.log(JSON.parse(event.body));
  return getPayables(JSON.parse(event.body))
    .then(payables => {
      console.log('response');
      console.log(payables);
      return {
        statusCode: 200,
        body: JSON.stringify(payables),
      };
    })
    .catch(error => {
      console.log('error');
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
}

async function getPayables(transactions) {
  const requests = transactions.map(transactionId =>
    pagarme.client
      .connect({ api_key: process.env.PAGARME_API_KEY })
      .then(client => client.payables.find({ transactionId }))
      .then(payables => payables)
      .catch(err => Promise.reject(err))
  );
  try {
    const payables = await Promise.all(requests);
    console.log(payables);

    return getPayablesBySeller(payables);
  } catch (err) {
    return Promise.reject(err);
  }
}

function getPayablesBySeller(payables) {
  const initialPayablesObj = { fees: 0, platform: 0 };

  return payables.flat().reduce((payablesObj, payable) => {
    payablesObj.fees += payable.fee;

    if (payable.recipient_id === process.env.PLATFORM_ID) {
      payablesObj.platform += payable.amount;
      return payablesObj;
    }

    payablesObj[payable.recipient_id] = payable.amount - payable.fee;
    return payablesObj;
  }, initialPayablesObj);
}
