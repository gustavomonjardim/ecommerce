import React from 'react';
import FadeIn from 'react-fade-in';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useForm } from '../context/FormContext';
import { masks } from '../services/maskService';

const PersonalDataForm = () => {
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
    </FadeIn>
  );
};

export default PersonalDataForm;
