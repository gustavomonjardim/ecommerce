import { Link } from 'gatsby';
import propTypes from 'prop-types';
import React from 'react';

import BagIcon from '../assets/svg/BagIcon';
import { currencyMask } from '../services/maskService';

const ProductCard = ({ link, name, price, image }) => {
  return (
    <Link to={link} className="cursor-pointer">
      <div className="relative pb-4/3">
        <img className="absolute w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="flex flex-row justify-between items-start my-4">
        <div>
          <h4 className="text-sm text-black font-thin">{name}</h4>
          <p className="text-md text-gray-600 font-thin">{currencyMask(price)}</p>
        </div>
        <button type="button" className="cursor-pointer text-black h-5 w-5 focus:outline-none">
          <BagIcon />
        </button>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  link: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  image: propTypes.object.isRequired,
};

export default ProductCard;
