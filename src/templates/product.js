import { graphql } from 'gatsby';
import React, { useState } from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import NumberSelect from '../components/NumberSelect';
import { useBag } from '../context/BagContext';
import { currencyMask } from '../services/maskService';

const Product = ({ data: { productsJson: product } }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useBag();

  const increaseQuantity = () => {
    setQuantity(quantity => quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity => quantity - 1);
    }
  };
  const checkout = () => {
    addProduct({ ...product, quantity });
  };
  return (
    <Layout>
      <div className="w-full flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <img src={product.image} alt="" className="w-full md:w-80 lg:w-100" />
        <div className="flex flex-grow flex-col items-center mt-4 w-full lg:max-w-lg md:mt-0 md:ml-12 md:items-start">
          <div className="w-full flex flex-row items-baseline justify-between my-6 lg:mt-0 lg:mb-10 ">
            <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl">{product.name}</h1>
            <span className="text-black text-xl sm:text-2xl lg:text-3xl font-thin">
              {currencyMask(product.price)}
            </span>
          </div>

          <p>
            This Ecma Standard defines the ECMAScript 2020 Language. It is the eleventh edition of
            the ECMAScript Language Specification. Since publication of the first edition in 1997,
            ECMAScript has grown to be one of the world's most widely used general-purpose
            programming languages. It is best known as the language embedded in web browsers but has
            also been widely adopted for server and embedded applications.
          </p>
          <div className="flex flex-row text-gray-700 mt-8">
            <span>Produto vendido por </span>
            <span className="text-black ml-1 font-semibold">{product.seller.name}</span>
          </div>
          <div className="w-full flex flex-row my-8">
            <NumberSelect
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <Button text="Add to bag" onClick={checkout} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ProductById($id: String!) {
    productsJson(id: { eq: $id }) {
      id
      image
      description
      name
      price
      seller {
        name
      }
    }
  }
`;

export default Product;
