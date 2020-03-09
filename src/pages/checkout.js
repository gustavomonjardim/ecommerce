import { Link } from 'gatsby';
import React, { useState } from 'react';

import Button from '../components/Button';
import Layout from '../components/CheckoutLayout';
import Step from '../components/Step';
import TextInput from '../components/TextInput';
import { useBag } from '../context/BagContext';
import { useForm, FormContextProvider } from '../context/FormContext';
import { parseAndFormatDateService, getFutureDate } from '../services/dateService';
import { masks, removeMaskService } from '../services/maskService';
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
  const { bag, totalValue, cleanBag } = useBag();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const confirmOrder = () => {
    setLoading(true);
    const customer = {
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

    const billing = {
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

    const items = bag.map(item => ({
      id: item.id,
      title: item.name,
      unit_price: item.price * 100,
      quantity: item.quantity,
      tangible: true,
    }));

    const shipping = {
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

    fetch('/.netlify/functions/createTransaction', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalValue * 100,
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
            recipient_id: 're_ck6zb8w010hrgnd6d1dkeblug',
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
      }),
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false);
        cleanBag();
        setStep(4);
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="w-full max-w-xl flex flex-col justify-center items-center bg-gray-100 px-4 py-16">
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
          {step === 3 && <Button text="Confirm order" onClick={confirmOrder} loading={loading} />}
          {step === 4 && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold">Compra concluída com sucesso!</h2>
              <Link
                to="/"
                className="uppercase mt-6 font-semibold text-gray-700 hover:text-gray-600"
              >
                Shop More
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
