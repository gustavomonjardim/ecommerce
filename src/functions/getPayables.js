import pagarme from 'pagarme';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export async function handler(event) {
  return getPayables(JSON.parse(event.body))
    .then(payables => {
      return {
        statusCode: 200,
        body: JSON.stringify(payables),
      };
    })
    .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}

async function getPayables(transactions) {
  const requests = transactions.map(transactionId =>
    pagarme.client
      .connect({ api_key: process.env.PAGARME_API_KEY })
      .then(client => client.payables.find({ transactionId }))
      .then(payables => payables)
      .catch(err => err)
  );

  const payables = await Promise.all(requests);
  return getPayablesBySeller(payables);
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
