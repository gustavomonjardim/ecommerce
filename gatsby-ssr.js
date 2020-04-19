import './src/styles/tailwind.css';
import propTypes from 'prop-types';
import React from 'react';

import { BagProvider } from './src/context/BagContext';
import { BagDisplayProvider } from './src/context/BagDisplayContext';

const wrapRootElement = ({ element }) => {
  return (
    <BagDisplayProvider>
      <BagProvider>{element}</BagProvider>
    </BagDisplayProvider>
  );
};

wrapRootElement.propTypes = {
  element: propTypes.oneOfType([propTypes.node.isRequired, propTypes.arrayOf(propTypes.node)])
    .isRequired,
};

export { wrapRootElement };
