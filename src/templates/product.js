import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../components/Button';
import NumberSelect from '../components/NumberSelect';
import { useBag } from '../context/BagContext';
import Layout from '../layouts/Layout';
import { currencyMask } from '../services/maskService';

export const ProductPageTemplate = ({
  image,
  name,
  price,
  quantity,
  description,
  increaseQuantity,
  decreaseQuantity,
  addToBag,
  seller,
}) => {
  return (
    <Layout title={name} description={description}>
      <div className="w-full flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <img src={image} alt="" className="w-full md:w-80 lg:w-100" />
        <div className="flex flex-grow flex-col items-center w-full lg:max-w-lg md:mt-0 md:ml-12 md:items-start">
          <div className="w-full flex flex-row items-baseline justify-between my-6 lg:mt-0 lg:mb-10 ">
            <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl">{name}</h1>
            <span className="text-black text-xl sm:text-2xl lg:text-3xl font-thin">
              {currencyMask(price)}
            </span>
          </div>
          <div className="w-full flex flex-col items-start">
            <p>{description}</p>
            <div className="flex flex-row text-gray-700 mt-8">
              <span>Produto vendido por </span>
              <span className="text-black ml-1 font-semibold">{seller}</span>
            </div>
          </div>
          <div className="w-full flex flex-row my-8">
            <div className="mr-4">
              <NumberSelect
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </div>
            <Button text="Add to bag" onClick={addToBag} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ProductPage = ({ data: { productsJson: product } }) => {
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
  const addToBag = () => {
    addProduct({ ...product, quantity });
  };

  return (
    <ProductPageTemplate
      image={product.image}
      name={product.name}
      price={product.price}
      description={product.description}
      seller={product.seller.name}
      quantity={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      addToBag={addToBag}
    />
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
      fields {
        slug
      }
      seller {
        id
        name
      }
    }
  }
`;

ProductPageTemplate.propTypes = {
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  quantity: propTypes.number.isRequired,
  description: propTypes.string.isRequired,
  increaseQuantity: propTypes.func.isRequired,
  decreaseQuantity: propTypes.func.isRequired,
  addToBag: propTypes.func.isRequired,
  seller: propTypes.string.isRequired,
};

ProductPage.propTypes = {
  data: propTypes.shape({
    productsJson: propTypes.shape.isRequired,
  }).isRequired,
};

export default ProductPage;
