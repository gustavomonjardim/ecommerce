import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import NumberSelect from '.';

let quantity = 1;
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

  expect(getByText('01')).toBeTruthy();
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
