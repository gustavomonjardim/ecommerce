import propTypes from 'prop-types';
import React, { useRef } from 'react';

import Loader from '../Loader';

const Button = ({ text, onClick, loading }) => {
  const ref = useRef();

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
    ref.current.blur();
  };
  return (
    <>
      {!loading && (
        <button
          ref={ref}
          onClick={handleClick}
          className="w-full px-4 py-2 bg-transparent text-black font-semibold text-sm tracking-wide uppercase border border-black h-12 hover:bg-black hover:text-white active:translate-y-1 transform "
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
