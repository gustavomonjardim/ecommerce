import { useBag } from '../context/BagContext';
import { parseAndFormatDateService, getFutureDate } from '../services/dateService';
import { removeMaskService } from '../services/maskService';

export function useCreateTransactions() {
  const { bag } = useBag();

  const getProductsBySeller = () => {
    return bag.reduce((list, product) => {
      if (list[product.seller.id]) {
        list[product.seller.id] = [...list[product.seller.id], product];
      } else {
        list[product.seller.id] = [product];
      }

      return list;
    }, {});
  };

  const customerPayload = personalData => {
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
  };

  const billingPayload = (personalData, addressData) => {
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
  };

  const shippingPayload = (personalData, addressData) => {
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
  };

  const createTransactions = async ({ personalData, addressData, paymentData }) => {
    const customer = customerPayload(personalData);
    const billing = billingPayload(personalData, addressData);
    const shipping = shippingPayload(personalData, addressData);

    const productsBySeller = getProductsBySeller();

    const requests = Object.keys(productsBySeller).map(async seller => {
      const products = productsBySeller[seller];

      const items = products.map(item => ({
        id: item.id,
        title: item.name,
        unit_price: item.price * 100,
        quantity: item.quantity,
        tangible: true,
      }));

      const amount = products.reduce((total, product) => total + product.price * 100, 0);

      const body = JSON.stringify({
        amount,
        card_number: paymentData.cardNumber,
        card_cvv: paymentData.cvv,
        card_expiration_date: removeMaskService(paymentData.expirationDate),
        card_holder_name: paymentData.fullName,
        customer,
        billing,
        shipping,
        items,
        split_rules: [
          {
            recipient_id: seller,
            percentage: 85,
            liable: true,
            charge_processing_fee: true,
            charge_remainder: true,
          },
          {
            recipient_id: 're_ck6zasyef0i8skz6fvwnow1zo',
            percentage: 15,
            liable: true,
            charge_processing_fee: false,
            charge_remainder: false,
          },
        ],
      });

      try {
        const response = await fetch('/.netlify/functions/createTransaction', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body,
        });
        const res = await response.json();

        return [null, res];
      } catch (err) {
        return [err];
      }
    });

    return Promise.all(requests);
  };

  return { createTransactions };
}
