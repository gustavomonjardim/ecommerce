import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { product, products } from '../../../__mocks__/products';
import BagWithProducts from '../../context/__mocks__/BagContextWithProducts';

import ProductCard from '.';

afterEach(() => {
  jest.clearAllMocks();
});

test('should display product title, price and image', async () => {
  const { getByAltText, getByText } = render(
    <BagWithProducts products={[]}>
      <ProductCard product={product} />
    </BagWithProducts>
  );

  expect(getByAltText(product.name)).toBeInTheDocument();
  expect(getByText(product.name)).toBeInTheDocument();
  expect(getByText('R$ 10,00')).toBeInTheDocument();
  expect.assertions(3);
});

test('should change "Remove from bag" button to "Add to bag" when product is removed from bag', async () => {
  const { findByLabelText, getByLabelText } = render(
    <BagWithProducts products={products}>
      <ProductCard product={product} />
    </BagWithProducts>
  );
  fireEvent.click(getByLabelText('Remove from bag'));

  const addToBagButton = await findByLabelText('Add to bag');

  expect(addToBagButton).toBeInTheDocument();
  expect.assertions(1);
});

test('should change "Add to bag" button to "Remove from bag" when product is added to bag', async () => {
  const { findByLabelText, getByLabelText } = render(
    <BagWithProducts products={[]}>
      <ProductCard product={product} />
    </BagWithProducts>
  );
  fireEvent.click(getByLabelText('Add to bag'));

  const addToBagButton = await findByLabelText('Remove from bag');

  expect(addToBagButton).toBeInTheDocument();
  expect.assertions(1);
});
