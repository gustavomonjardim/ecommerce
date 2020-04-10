import { navigate } from 'gatsby';
import React, { useState } from 'react';

import Button from '../components/Button';
import Error from '../components/Error';
import Step from '../components/Step';
import { useBag } from '../context/BagContext';
import { FormProvider } from '../context/FormContext';
import AddressForm from '../forms/AddressForm';
import PaymentForm from '../forms/PaymentForm';
import PersonalDataForm from '../forms/PersonalDataForm';
import Receipt from '../forms/Receipt';
import Layout from '../layouts/CheckoutLayout';
import { createTransactions } from '../services/pagarmeService';
import {
  paymentValidation,
  personalDataValidation,
  addressValidation,
} from '../services/validationService';

const Checkout = () => {
  const { cleanBag, bag, totalValue } = useBag();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState(null);
  const [receipt, setReceipt] = useState({
    bag: [],
    transactions: [],
    totalValue: 0,
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit_card',
    fullName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [personalData, setPersonalData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    birthdate: '',
  });

  const [addressData, setAddressData] = useState({
    zipCode: '',
    street: '',
    neighborhood: '',
    number: '',
    state: '',
    city: '',
  });

  const submitPersonalData = data => {
    setPersonalData(data);
    setStep(step => step + 1);
  };

  const submitPaymentData = data => {
    setPaymentData(data);
    setStep(step => step + 1);
  };

  const submitAddressData = data => {
    setAddressData(data);
    setStep(step => step + 1);
  };

  const goBack = () => {
    setStep(step => step - 1);
  };

  const confirmOrder = async () => {
    setStatus('LOADING');

    const [err, res] = await createTransactions({ personalData, addressData, paymentData, bag });

    if (err) {
      setStatus('ERROR');
      return;
    }

    setReceipt({
      bag,
      totalValue,
      transactions: res.map(transaction => transaction.id),
      sellers: res.reduce((sellersObj, transaction) => {
        const { sellerId, sellerName } = transaction.metadata;
        sellersObj[sellerId] = sellerName;
        return sellersObj;
      }, {}),
      payables: [],
    });
    setTimeout(() => {
      setStatus(null);
      cleanBag();
      setStep(step => step + 1);
    }, 1000);
  };

  return (
    <Layout title="Checkout">
      {bag?.length === 0 && receipt?.bag?.length === 0 && (
        <div className="w-full max-w-lg flex flex-col flex-grow items-center justify-start">
          <span className="text-gray-800 text-lg mb-8">
            Looks like there&apos;s nothing in your bag.
          </span>
          <Button text="Start shopping" onClick={() => navigate('/')}></Button>
        </div>
      )}

      {(bag?.length > 0 || receipt?.bag?.length > 0) && (
        <>
          {status === 'ERROR' && (
            <Error text="Não foi possível realizar a sua compra. Tente novamente." />
          )}
          <div className="w-full max-w-xl flex flex-col justify-center items-center bg-white px-4 py-16 md:shadow-xl md:rounded-lg">
            {step !== 4 && (
              <div className="w-full flex flex-row mb-12">
                <Step
                  title="Information"
                  number="1"
                  active={step === 0}
                  checked={step >= 1}
                  onClick={() => setStep(0)}
                />
                <Step
                  title="Payment"
                  number="2"
                  active={step === 1}
                  checked={step >= 2}
                  onClick={() => setStep(1)}
                />
                <Step
                  title="Shipping"
                  number="3"
                  active={step === 2}
                  checked={step >= 3}
                  onClick={() => setStep(2)}
                />
              </div>
            )}
            <div className="w-full max-w-lg flex flex-col items-center justify-center">
              {step === 0 && (
                <FormProvider
                  initialValues={personalData}
                  onSubmit={submitPersonalData}
                  validationSchema={personalDataValidation}
                >
                  <PersonalDataForm />
                </FormProvider>
              )}

              {step === 1 && (
                <FormProvider
                  initialValues={paymentData}
                  onSubmit={submitPaymentData}
                  validationSchema={paymentValidation}
                >
                  <PaymentForm goBack={goBack} />
                </FormProvider>
              )}

              {step === 2 && (
                <FormProvider
                  initialValues={addressData}
                  onSubmit={submitAddressData}
                  validationSchema={addressValidation}
                >
                  <AddressForm />
                </FormProvider>
              )}

              {step === 3 && (
                <Button
                  text="Confirm order"
                  onClick={confirmOrder}
                  loading={status === 'LOADING'}
                />
              )}

              {step === 4 && <Receipt receipt={receipt} />}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Checkout;
