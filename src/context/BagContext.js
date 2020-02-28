// import { useAsyncStorage } from '@react-native-community/async-storage';
import propTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';

const BagContext = React.createContext();

function BagProvider({ children }) {
  const [bag, setBag] = useState([]);

  const addProduct = useCallback(product => {
    setBag(bag => [...bag, product]);
  }, []);

  const removeProduct = useCallback(id => {
    setBag(bag => bag.filter(product => product.id !== id));
  }, []);

  const bagSize = useMemo(() => {
    return bag.length;
  }, [bag]);

  const defaultValue = useMemo(
    () => ({
      bag,
      bagSize,
      addProduct,
      removeProduct,
    }),
    [bag, bagSize, addProduct, removeProduct]
  );
  return <BagContext.Provider value={defaultValue}>{children}</BagContext.Provider>;
}

BagProvider.propTypes = {
  children: propTypes.oneOfType([propTypes.node.isRequired, propTypes.arrayOf(propTypes.node)])
    .isRequired,
};

function useBag() {
  const context = React.useContext(BagContext);
  if (context === undefined) {
    throw new Error(`useBag must be used within a CustomerProvider`);
  }
  return context;
}

export { BagProvider, useBag };
