import './src/styles/tailwind.css';
import React from 'react';

import { BagProvider } from './src/context/BagContext';

const wrapRootElement = ({ element }) => {
  return <BagProvider>{element}</BagProvider>;
};

export { wrapRootElement };
