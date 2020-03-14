import propTypes from 'prop-types';
import React from 'react';

import Loader from '../Loader';

const Button = ({ text, onClick, loading }) => {
  return (
    <>
      {!loading && (
        <button
          onClick={onClick}
          className="w-full bg-black text-white px-4 py-2 focus:outline-none font-semibold h-12 hover:bg-gray-900"
        >
          {text}
        </button>
      )}
      {loading && <Loader />}
    </>
  );
};

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  loading: propTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
