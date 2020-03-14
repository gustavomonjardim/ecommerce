import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import NumberSelect from '.';

let quantity = 10;
const increaseQuantity = jest.fn();
const decreaseQuantity = jest.fn();

const tree = (
  <NumberSelect
    quantity={quantity}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
  />
);

test('should display quantity correctly', async () => {
  const { getByText } = render(tree);

  expect(getByText('10')).toBeInTheDocument();
});

test('should display quantity with a zero when quantity is less then 10', async () => {
  const { getByText } = render(
    <NumberSelect
      quantity={1}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );

  expect(getByText('01')).toBeInTheDocument();
});

test('should call increaseQuantity function when plus button is pressed', async () => {
  const { getByText } = render(tree);

  fireEvent.click(getByText('+'));

  expect(increaseQuantity).toHaveBeenCalledTimes(1);
});

test('should call decreaseQuantity function when minus button is pressed', async () => {
  const { getByText } = render(tree);

  fireEvent.click(getByText('-'));

  expect(decreaseQuantity).toHaveBeenCalledTimes(1);
});
