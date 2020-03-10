import { useBag } from '../context/BagContext';

export function useCreateTransactions() {
  const { bag } = useBag();

  const createTransactions = async ({ personalData, addressData, paymentData }) => {
    const body = JSON.stringify({
      personalData,
      addressData,
      paymentData,
      bag,
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
  };

  return { createTransactions };
}
