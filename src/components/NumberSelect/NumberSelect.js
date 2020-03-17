import propTypes from 'prop-types';
import React from 'react';

const NumberSelect = ({ quantity, decreaseQuantity, increaseQuantity }) => {
  return (
    <div className="flex flex-row flex-grow-0 items-center justify-between h-12 border-solid border-t border-b border-l border-r px-4 py-2 border-gray-600">
      <button
        aria-label="Decrease quantity"
        className="text-gray-600 text-lg focus:outline-none leading-none text-lg px-2"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="mx-5 text-md font-light text-sm">
        {quantity >= 10 ? quantity : `0${quantity}`}
      </span>
      <button
        aria-label="Increase quantity"
        className="text-gray-600 text-lg focus:outline-none leading-none text-lg px-2"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

NumberSelect.propTypes = {
  quantity: propTypes.number.isRequired,
  decreaseQuantity: propTypes.func.isRequired,
  increaseQuantity: propTypes.func.isRequired,
};

export default NumberSelect;
