import propTypes from 'prop-types';
import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white px-4 py-2 focus:outline-none font-semibold h-12"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;
