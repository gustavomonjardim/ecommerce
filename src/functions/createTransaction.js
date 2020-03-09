const pagarme = require('pagarme');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export async function handler(event, context) {
  return pagarme.client
    .connect({ api_key: process.env.PAGARME_API_KEY })
    .then(client => client.transactions.create(JSON.parse(event.body)))
    .then(transaction => {
      return {
        statusCode: 200,
        body: JSON.stringify(transaction),
      };
    })
    .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}
