import { useCallback } from 'react';

export function usePagarMe() {
  const createTransactions = useCallback(
    async ({ personalData, addressData, paymentData, bag }) => {
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
    },
    []
  );

  const getPayables = useCallback(async body => {
    try {
      const response = await fetch('/.netlify/functions/getPayables', {
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
  }, []);

  return { createTransactions, getPayables };
}
