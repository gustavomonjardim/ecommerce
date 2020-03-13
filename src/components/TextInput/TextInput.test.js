import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { masks } from '../../services/maskService';

afterEach(() => {
  jest.clearAllMocks();
});

import TextInput from '.';

const email = '';
const onChange = jest.fn();
const onBlur = jest.fn();

const tree = (
  <TextInput
    id="email"
    placeholder="email@provedor.com"
    label="E-mail"
    value={email}
    onChange={onChange}
    onBlur={onBlur}
  />
);

test('should call onBlur function when input is blurred', async () => {
  const { getByLabelText } = render(tree);

  fireEvent.blur(getByLabelText('E-mail'));

  expect(onBlur).toHaveBeenCalledTimes(1);
});

test('should call onChange function with correct text when input is changed', async () => {
  const { getByLabelText } = render(tree);

  fireEvent.change(getByLabelText('E-mail'), { target: { value: '1234' } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('1234');
});

test('should display error message when there is an error', async () => {
  const error = 'ocorreu um erro';

  const { getByText } = render(
    <TextInput
      id="email"
      placeholder="email@provedor.com"
      label="E-mail"
      value={email}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
    />
  );

  const errorMessage = getByText(error);

  expect(errorMessage).toBeTruthy();
});

test('should format input correctly', async () => {
  const cpf = '';
  const { getByLabelText } = render(
    <TextInput
      id="cpf"
      placeholder="000.000.000-00"
      label="CPF"
      formatText={current => masks.cpf(current, cpf)}
      value={cpf}
      onChange={onChange}
      onBlur={onBlur}
    />
  );

  fireEvent.change(getByLabelText('CPF'), { target: { value: '16061833709' } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('160.618.337-09');
});
