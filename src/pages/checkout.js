import { navigate } from 'gatsby';
import React, { useState, useEffect } from 'react';

import Button from '../components/Button';
import Layout from '../components/CheckoutLayout';
import Error from '../components/Error';
import Step from '../components/Step';
import TextInput from '../components/TextInput';
import { useBag } from '../context/BagContext';
import { useForm, FormContextProvider } from '../context/FormContext';
import { useCreateTransactions } from '../hooks/useCreateTransactions';
import { masks, currencyMask } from '../services/maskService';
import {
  paymentValidation,
  personalDataValidation,
  addressValidation,
} from '../services/validationService';

const PaymentForm = () => {
  const { handleChange, handleBlur, values, errors, touched, submitForm } = useForm();
  return (
    <>
      <TextInput
        id="fullName"
        placeholder="Full Name"
        label="Full Name"
        value={values.fullName}
        onChange={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        error={touched['fullName'] ? errors['fullName'] : null}
      />
      <TextInput
        id="cardNumber"
        placeholder="0000 0000 0000 0000"
        label="Card Number"
        maxLength={19}
        formatText={current => masks.cardNumber(current, values.cardNumber)}
        value={values.cardNumber}
        onChange={handleChange('cardNumber')}
        onBlur={handleBlur('cardNumber')}
        error={touched['cardNumber'] ? errors['cardNumber'] : null}
      />
      <div className="w-full flex flex-wrap">
        <div className="w-full sm:w-2/3 sm:pr-4">
          <TextInput
            id="expirationDate"
            placeholder="00/00"
            label="Expiration Date"
            maxLength={5}
            formatText={current => masks.creditCardDate(current, values.expirationDate)}
            value={values.expirationDate}
            onChange={handleChange('expirationDate')}
            onBlur={handleBlur('expirationDate')}
            error={touched['expirationDate'] ? errors['expirationDate'] : null}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <TextInput
            id="cvv"
            placeholder="000"
            label="CVV"
            maxLength={3}
            value={values.cvv}
            onChange={handleChange('cvv')}
            onBlur={handleBlur('cvv')}
            error={touched['cvv'] ? errors['cvv'] : null}
          />
        </div>
      </div>
      <div className="w-full mt-12">
        <Button text="Next" onClick={submitForm} />
      </div>
    </>
  );
};

const PersonalDataForm = () => {
  const { handleChange, handleBlur, values, errors, touched, submitForm } = useForm();
  return (
    <>
      <TextInput
        id="fullName"
        placeholder="Full Name"
        label="Full Name"
        value={values.fullName}
        onChange={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        error={touched['fullName'] ? errors['fullName'] : null}
      />
      <TextInput
        id="cpf"
        placeholder="000.000.000-00"
        label="CPF"
        maxLength={14}
        formatText={current => masks.cpf(current, values.cpf)}
        value={values.cpf}
        onChange={handleChange('cpf')}
        onBlur={handleBlur('cpf')}
        error={touched['cpf'] ? errors['cpf'] : null}
      />
      <TextInput
        id="email"
        placeholder="name@provider.com"
        label="E-mail"
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched['email'] ? errors['email'] : null}
      />
      <TextInput
        id="phone"
        placeholder="(00) 0 0000-0000"
        label="Phone Number"
        formatText={current => masks.celular(current, values.phone)}
        maxLength={17}
        value={values.phone}
        onChange={handleChange('phone')}
        onBlur={handleBlur('phone')}
        error={touched['phone'] ? errors['phone'] : null}
      />
      <TextInput
        id="birthdate"
        placeholder="00/00/0000"
        label="Birthdate"
        maxLength={10}
        formatText={current => masks.data(current, values.birthdate)}
        value={values.birthdate}
        onChange={handleChange('birthdate')}
        onBlur={handleBlur('birthdate')}
        error={touched['birthdate'] ? errors['birthdate'] : null}
      />
      <div className="w-full mt-12">
        <Button text="Next" onClick={submitForm} />
      </div>
    </>
  );
};

const AddressForm = () => {
  const { handleChange, handleBlur, values, errors, touched, submitForm } = useForm();
  return (
    <>
      <TextInput
        id="zipCode"
        placeholder="00000-000"
        label="CEP"
        maxLength={9}
        value={values.zipCode}
        formatText={current => masks.cep(current, values.zipCode)}
        onChange={handleChange('zipCode')}
        onBlur={handleBlur('zipCode')}
        error={touched['zipCode'] ? errors['zipCode'] : null}
      />
      <div className="w-full flex flex-wrap">
        <div className="w-full sm:w-2/3 sm:pr-4">
          <TextInput
            id="street"
            placeholder="Street"
            label="Street"
            value={values.street}
            onChange={handleChange('street')}
            onBlur={handleBlur('street')}
            error={touched['street'] ? errors['street'] : null}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <TextInput
            id="number"
            placeholder="0000"
            label="Number"
            value={values.number}
            onChange={handleChange('number')}
            onBlur={handleBlur('number')}
            error={touched['number'] ? errors['number'] : null}
          />
        </div>
      </div>
      <TextInput
        id="neighborhood"
        placeholder="Neighborhood"
        label="Neighborhood"
        value={values.neighborhood}
        onChange={handleChange('neighborhood')}
        onBlur={handleBlur('neighborhood')}
        error={touched['neighborhood'] ? errors['neighborhood'] : null}
      />

      <div className="w-full flex flex-wrap">
        <div className="w-full sm:w-2/3 sm:pr-4">
          <TextInput
            id="city"
            placeholder="City"
            label="City"
            value={values.city}
            onChange={handleChange('city')}
            onBlur={handleBlur('city')}
            error={touched['city'] ? errors['city'] : null}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <TextInput
            id="state"
            placeholder="State"
            label="State"
            value={values.state}
            onChange={handleChange('state')}
            onBlur={handleBlur('state')}
            error={touched['state'] ? errors['state'] : null}
          />
        </div>
      </div>
      <div className="w-full mt-12">
        <Button text="Next" onClick={submitForm} />
      </div>
    </>
  );
};

const Checkout = () => {
  const { cleanBag, bag, totalValue } = useBag();
  const { createTransactions } = useCreateTransactions();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState(null);
  const [receipt, setReceipt] = useState({
    bag: [],
    transactions: [],
    totalValue: 0,
  });

  const [paymentData, setPaymentData] = useState({
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

  useEffect(() => {
    if (receipt.transactions?.length > 0) {
      getPayables(JSON.stringify(receipt.transactions));
    }
  }, [receipt.transactions]);

  async function getPayables(body) {
    try {
      const response = await fetch('/.netlify/functions/getPayables', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      });
      const res = await response.json();

      setReceipt(receipt => ({
        ...receipt,
        payables: res,
      }));

      return [null, res];
    } catch (err) {
      return [err];
    }
  }

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

    const [err, res] = await createTransactions({ personalData, addressData, paymentData });

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

    setStatus(null);
    cleanBag();
    setStep(step => step + 1);
  };

  return (
    <Layout>
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
            <FormContextProvider
              initialValues={personalData}
              onSubmit={submitPersonalData}
              validationSchema={personalDataValidation}
            >
              <PersonalDataForm />
            </FormContextProvider>
          )}

          {step === 1 && (
            <FormContextProvider
              initialValues={paymentData}
              onSubmit={submitPaymentData}
              validationSchema={paymentValidation}
            >
              <PaymentForm goBack={goBack} />
            </FormContextProvider>
          )}

          {step === 2 && (
            <FormContextProvider
              initialValues={addressData}
              onSubmit={submitAddressData}
              validationSchema={addressValidation}
            >
              <AddressForm />
            </FormContextProvider>
          )}
          {step === 3 && (
            <Button text="Confirm order" onClick={confirmOrder} loading={status === 'LOADING'} />
          )}
          {step === 4 && (
            <div className="w-full flex flex-col">
              <h2 className="text-2xl font-semibold tracking-wide leading-tight mb-4 border-gray-500 pb-12 border-b">
                Compra concluída com sucesso!
              </h2>
              <h4 className="font-semibold text-lg text-center mb-2">Produtos</h4>
              <div className="w-full border-gray-500 border-b mb-4 h-80 overflow-y-scroll">
                {receipt.bag.map(product => (
                  <div key={product.id} className="w-full flex flex-row py-2 mb-4">
                    <div className="relative w-32">
                      <img
                        className="absolute h-full w-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="w-full flex flex-col ml-4">
                      <span className="font-semibold text-lg text-gray-700">{product.name}</span>
                      <span className="text-sm text-gray-700">{`${product.quantity} ${
                        product.quantity === 1 ? 'unidade' : 'unidades'
                      }`}</span>
                      <span className="my-2 font-semibold text-md text-gray-800">
                        {currencyMask(product.price)}
                      </span>
                      <span className="text-gray-600 text-sm">
                        Vendido por <span className="font-semibold">{product.seller.name}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full pb-4 mb-4 border-gray-500 border-b">
                <h4 className="font-semibold text-lg text-center mb-2">Divisão do pagamento</h4>
                {Object.keys(receipt.payables)
                  .filter(key => key !== 'fees' && key !== 'platform')
                  .map(recipient => (
                    <div key={recipient} className="w-full flex flex-row justify-between">
                      <span className="text-gray-600 text-sm">{receipt.sellers[recipient]}</span>
                      <span className="text-gray-700 text-sm font-semibold">
                        {currencyMask(receipt.payables[recipient] / 100)}
                      </span>
                    </div>
                  ))}
                <div className="w-full flex flex-row justify-between">
                  <span className="text-gray-600 text-sm">Plants</span>
                  <span className="text-gray-700 text-sm font-semibold">
                    {currencyMask(receipt.payables.platform / 100)}
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <span className="text-gray-600 text-sm">Taxas</span>
                  <span className="text-gray-700 text-sm font-semibold">
                    {currencyMask(receipt.payables.fees / 100)}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-row justify-between">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-semibold text-lg text-green-600">
                  {currencyMask(receipt.totalValue)}
                </span>
              </div>

              <div className="w-full mt-8">
                <Button text="Shop more" onClick={() => navigate('/')} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
