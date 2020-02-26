import propTypes from 'prop-types';
import React from 'react';

const MenuIcon = ({ open }) => {
  return (
    <svg className="stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {!open && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
      {open && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      )}
    </svg>
  );
};

MenuIcon.propTypes = {
  open: propTypes.bool.isRequired,
};

export default MenuIcon;
