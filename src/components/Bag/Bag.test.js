import { render, fireEvent } from '@testing-library/react';
import { navigate } from 'gatsby';
import React from 'react';

import { products } from '../../../__mocks__/products';
import BagWithProducts from '../../context/__mocks__/BagContextWithProducts';
import { BagControllerContext, BagDisplayContext } from '../../context/BagDisplayContext';

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
  <BagControllerContext.Provider value={{ closeBag }}>
    <BagDisplayContext.Provider value={open}>
      <BagWithProducts products={[]}>
        <Bag open={open} closeBag={closeBag} />
      </BagWithProducts>
    </BagDisplayContext.Provider>
  </BagControllerContext.Provider>
);

const filledBagTree = (
  <BagControllerContext.Provider value={{ closeBag }}>
    <BagDisplayContext.Provider value={open}>
      <BagWithProducts products={products}>
        <Bag open={open} closeBag={closeBag} />
      </BagWithProducts>
    </BagDisplayContext.Provider>
  </BagControllerContext.Provider>
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

test('should close Bag when ESC key is pressed', () => {
  const { getByLabelText } = render(tree);

  fireEvent.focus(getByLabelText('overlay'));

  fireEvent.keyDown(getByLabelText('overlay'), { keyCode: 27 });

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
  const { getByTestId } = render(filledBagTree);

  const listContainer = getByTestId('products');

  expect(listContainer.children.length).toBe(3);
});

test('should navigate to checkout when bag has products and checkout button is pressed', () => {
  const { getByText } = render(filledBagTree);

  fireEvent.click(getByText('Checkout'));

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/checkout');
});

test('should be able to remove product from bag', () => {
  const { getAllByLabelText, getByTestId } = render(filledBagTree);

  const listContainer = getByTestId('products');
  expect(listContainer.children.length).toBe(3);

  const removeButtons = getAllByLabelText('Remove from bag');
  fireEvent.click(removeButtons[0]);

  expect(listContainer.children.length).toBe(2);
});

test('should be able to increase and decrease the quantity of a product', async () => {
  const { getAllByLabelText, findByText } = render(filledBagTree);

  const increaseButtons = getAllByLabelText('Increase quantity');
  fireEvent.click(increaseButtons[0]);
  fireEvent.click(increaseButtons[0]);

  const increseadQuantity = await findByText('03');

  expect(increseadQuantity).toBeInTheDocument();

  const decreaseButtons = getAllByLabelText('Decrease quantity');
  fireEvent.click(decreaseButtons[0]);

  const decreasedQuantity = await findByText('02');

  expect(decreasedQuantity).toBeInTheDocument();
});
