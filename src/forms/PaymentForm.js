import React from 'react';
import FadeIn from 'react-fade-in';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useForm } from '../context/FormContext';
import { masks } from '../services/maskService';

const PaymentForm = () => {
  const { handleChange, handleBlur, values, errors, touched, submitForm } = useForm();
  return (
    <FadeIn className="w-full">
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
    </FadeIn>
  );
};

export default PaymentForm;
