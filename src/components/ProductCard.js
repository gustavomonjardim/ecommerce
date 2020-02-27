import { Link } from 'gatsby';
import React from 'react';

import productImg from '../assets/images/product.jpg';
import BagIcon from '../assets/svg/BagIcon';
const ProductCard = () => {
  return (
    <Link className="cursor-pointer">
      <div className="relative pb-4/3">
        <img className="absolute w-full h-full object-cover" src={productImg} alt="" />
      </div>
      <div className="flex flex-row justify-between items-baseline my-4">
        <div>
          <h4 className="text-md text-black font-semibold">Nome do Produto</h4>
          <p className="text-sm text-black">R$ 24,00</p>
        </div>
        <button type="button" className="cursor-pointer text-black h-5 w-5 focus:outline-none">
          <BagIcon />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
