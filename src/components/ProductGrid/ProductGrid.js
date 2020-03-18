import propTypes from 'prop-types';
import React from 'react';

const ProductGrid = ({ children }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">{children}</div>;
};

ProductGrid.propTypes = {
  children: propTypes.arrayOf(propTypes.node),
};

ProductGrid.defaultProps = {
  children: null,
};

export default ProductGrid;
