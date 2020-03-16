import pagarme from 'pagarme';

import { parseAndFormatDateService, getFutureDate } from '../services/dateService';
import { removeMaskService } from '../services/maskService';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export async function handler(event) {
  console.log(JSON.parse(event.body));
  return createTransactions(JSON.parse(event.body))
    .then(transactions => {
      console.log('response');
      console.log(transactions);
      return {
        statusCode: 200,
        body: JSON.stringify(transactions),
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

async function createTransactions({ personalData, addressData, paymentData, bag }) {
  const customer = customerPayload(personalData);
  const billing = billingPayload(personalData, addressData);
  const shipping = shippingPayload(personalData, addressData);
  const productsBySeller = getProductsBySeller(bag);

  const requests = Object.keys(productsBySeller).map(async seller => {
    const { products, sellerName } = productsBySeller[seller];

    const items = products.map(item => ({
      id: item.id,
      title: item.name,
      unit_price: Math.ceil(item.price * 100),
      quantity: item.quantity,
      tangible: true,
    }));

    const amount = Math.ceil(
      products.reduce((total, product) => total + product.price * 100 * product.quantity, 0)
    );

    const body = {
      amount,
      card_number: paymentData.cardNumber,
      card_cvv: paymentData.cvv,
      card_expiration_date: removeMaskService(paymentData.expirationDate),
      card_holder_name: paymentData.fullName,
      customer,
      billing,
      shipping,
      items,
      metadata: {
        sellerName,
        sellerId: seller,
      },
      split_rules: [
        {
          recipient_id: seller,
          percentage: process.env.SELLER_PERCENTAGE,
          liable: true,
          charge_processing_fee: true,
          charge_remainder: true,
        },
        {
          recipient_id: process.env.PLATFORM_ID,
          percentage: process.env.PLATFORM_PERCENTAGE,
          liable: true,
          charge_processing_fee: false,
          charge_remainder: false,
        },
      ],
    };

    console.log(body);

    return pagarme.client
      .connect({ api_key: process.env.PAGARME_API_KEY })
      .then(client => client.transactions.create(body))
      .then(transaction => transaction)
      .catch(error => Promise.reject(error));
  });

  return Promise.all(requests);
}

function getProductsBySeller(bag) {
  return bag.reduce((sellersObj, product) => {
    const { id, name } = product.seller;

    if (sellersObj[id]) {
      sellersObj[id].products = [...sellersObj[id].products, product];
      return sellersObj;
    }

    sellersObj[id] = {
      products: [product],
      sellerName: name,
    };
    return sellersObj;
  }, {});
}

function customerPayload(personalData) {
  return {
    external_id: removeMaskService(personalData.cpf),
    name: personalData.fullName,
    type: 'individual',
    country: 'br',
    email: personalData.email,
    documents: [
      {
        type: 'cpf',
        number: removeMaskService(personalData.cpf),
      },
    ],
    phone_numbers: [`+55${removeMaskService(personalData.phone)}`],
    birthday: parseAndFormatDateService(personalData.birthdate, 'DD/MM/YYYY', 'YYYY-MM-DD'),
  };
}

function billingPayload(personalData, addressData) {
  return {
    name: personalData.fullName,
    address: {
      country: 'br',
      state: addressData.state,
      city: addressData.city,
      neighborhood: addressData.neighborhood,
      street: addressData.street,
      street_number: addressData.number,
      zipcode: removeMaskService(addressData.zipCode),
    },
  };
}

function shippingPayload(personalData, addressData) {
  return {
    name: personalData.fullName,
    fee: 0,
    delivery_date: getFutureDate(3, 'YYYY-MM-DD'),
    expedited: true,
    address: {
      country: 'br',
      state: addressData.state,
      city: addressData.city,
      neighborhood: addressData.neighborhood,
      street: addressData.street,
      street_number: addressData.number,
      zipcode: removeMaskService(addressData.zipCode),
    },
  };
}
