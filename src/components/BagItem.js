import { Link } from 'gatsby';
import React from 'react';

import CloseIcon from '../assets/svg/CloseIcon';
import { useBag } from '../context/BagContext';
import { currencyMask } from '../services/maskService';

import NumberSelect from './NumberSelect';

const BagItem = ({ product }) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } = useBag();
  return (
    <div className="flex flex-row pb-10">
      <Link to={`/product/${product.id}`} className="relative w-32 ">
        <img
          className="absolute w-full h-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="w-full flex flex-col justify-between ml-4">
        <div className="flex flex-row justify-between items-start">
          <div className="w-full flex flex-col self-auto">
            <span className="font-thin">{product.name}</span>
            <span className="text-xs text-gray-600 mb-2">{currencyMask(product.price)}</span>
          </div>
          <button onClick={() => removeProduct(product.id)} className="h-6 w-6 focus:outline-none">
            <CloseIcon />
          </button>
        </div>
        <div className="self-start">
          <NumberSelect
            quantity={product.quantity}
            increaseQuantity={() => increaseProductQuantity(product.id)}
            decreaseQuantity={() => decreaseProductQuantity(product.id)}
          />
        </div>
        <div className="w-full flex flex-row justify-between pt-3">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-sm font-semibold">
            {currencyMask(product.quantity * product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
