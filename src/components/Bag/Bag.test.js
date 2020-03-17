import { render, fireEvent } from '@testing-library/react';
import { navigate } from 'gatsby';
import React from 'react';

import { products } from '../../../__mocks__/products';
import BagWithProducts from '../../context/__mocks__/BagContextWithProducts';

import Bag from '.';

let open = true;
const closeBag = jest.fn(() => {
  open = false;
});

afterEach(() => {
  jest.clearAllMocks();
  open = true;
});

const tree = (
  <BagWithProducts products={[]}>
    <Bag open={open} closeBag={closeBag} />
  </BagWithProducts>
);

test('should close Bag when close button is pressed', () => {
  const { getByLabelText } = render(tree);
  fireEvent.click(getByLabelText('Close bag'));

  expect(closeBag).toHaveBeenCalledTimes(1);
  expect(open).toBeFalsy();
});

test('should close Bag when overlay is clicked', () => {
  const { getByLabelText } = render(tree);

  fireEvent.click(getByLabelText('overlay'));

  expect(closeBag).toHaveBeenCalledTimes(1);
  expect(open).toBeFalsy();
});

test('should display message and button directing to the store when bag is empty', () => {
  const { getByText } = render(tree);

  expect(getByText("Looks like there's nothing in your bag.")).toBeInTheDocument();

  fireEvent.click(getByText('Start shopping'));

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/');
});

test('should display all products from bag', () => {
  const { getByTestId } = render(
    <BagWithProducts products={products}>
      <Bag open={open} closeBag={closeBag} />
    </BagWithProducts>
  );

  const listContainer = getByTestId('products');

  expect(listContainer.children.length).toBe(3);
});

test('should navigate to checkout when bag has products and checkout button is pressed', () => {
  const { getByText } = render(
    <BagWithProducts products={products}>
      <Bag open={open} closeBag={closeBag} />
    </BagWithProducts>
  );

  fireEvent.click(getByText('Checkout'));

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/checkout');
});
