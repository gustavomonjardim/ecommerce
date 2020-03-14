import { Link } from 'gatsby';
import propTypes from 'prop-types';
import React, { useState } from 'react';

import BagIcon, { BagIconFilled } from '../assets/svg/BagIcon';
import { useBag } from '../context/BagContext';
import { currencyMask } from '../services/maskService';

const ProductCard = ({ product }) => {
  const { id, name, price, image } = product;
  const { addProduct, removeProduct, checkProduct } = useBag();
  const [isAdded, setAdded] = useState(checkProduct(id));

  const toggleBag = () => {
    if (isAdded) {
      removeProduct(id);
      setAdded(false);
    } else {
      addProduct({ ...product, quantity: 1 });
      setAdded(true);
    }
  };
  return (
    <div>
      <Link to={`/product/${id}`} className="cursor-pointer">
        <div className="relative pb-4/3">
          <img className="absolute w-full h-full object-cover" src={image} alt={name} />
        </div>
      </Link>
      <div className="flex flex-row justify-between items-start my-4">
        <div>
          <h4 className="text-sm text-black font-thin">{name}</h4>
          <p className="text-md text-gray-600 font-thin">{currencyMask(price)}</p>
        </div>
        <button
          onClick={toggleBag}
          type="button"
          className="cursor-pointer text-black h-5 w-5 focus:outline-none"
        >
          {isAdded ? <BagIconFilled /> : <BagIcon />}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    image: propTypes.string.isRequired,
    seller: propTypes.shape.isRequired,
  }).isRequired,
};

export default ProductCard;
