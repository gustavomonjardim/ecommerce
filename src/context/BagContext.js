// import { useAsyncStorage } from '@react-native-community/async-storage';
import propTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';

const BagContext = React.createContext();

function BagProvider({ children }) {
  const [bag, setBag] = useState([]);

  const checkProduct = useCallback(
    id => {
      return bag.some(product => product.id === id);
    },
    [bag]
  );

  const addProduct = useCallback(
    newProduct => {
      if (checkProduct(newProduct.id)) {
        setBag(
          bag.map(product =>
            product.id === newProduct.id
              ? { ...product, quantity: product.quantity + newProduct.quantity }
              : product
          )
        );
        return;
      }
      setBag(bag => [...bag, newProduct]);
    },
    [bag, checkProduct]
  );

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
      checkProduct,
    }),
    [bag, bagSize, addProduct, removeProduct, checkProduct]
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
    throw new Error(`useBag must be used within a BagProvider`);
  }
  return context;
}

export { BagProvider, useBag };
