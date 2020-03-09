// import { useAsyncStorage } from '@react-native-community/async-storage';
import propTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';

const BagContext = React.createContext();

function BagProvider({ children }) {
  const [bag, setBag] = useState([]);

  const cleanBag = useCallback(() => {
    setBag([]);
  }, []);

  const checkProduct = useCallback(
    id => {
      return bag.some(product => product.id === id);
    },
    [bag]
  );

  const addProduct = useCallback(
    newProduct => {
      if (checkProduct(newProduct.id)) {
        setBag(bag =>
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
    [checkProduct]
  );

  const removeProduct = useCallback(id => {
    setBag(bag => bag.filter(product => product.id !== id));
  }, []);

  const increaseProductQuantity = useCallback(id => {
    setBag(bag =>
      bag.map(product =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  }, []);

  const decreaseProductQuantity = useCallback(id => {
    setBag(bag =>
      bag.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity > 1 ? product.quantity - 1 : product.quantity,
          };
        }
        return product;
      })
    );
  }, []);

  const bagSize = useMemo(() => {
    return bag.length;
  }, [bag]);

  const totalValue = useMemo(() => {
    return bag.reduce((total, product) => total + product.price * product.quantity, 0);
  }, [bag]);

  const defaultValue = useMemo(
    () => ({
      bag,
      bagSize,
      cleanBag,
      addProduct,
      removeProduct,
      checkProduct,
      increaseProductQuantity,
      decreaseProductQuantity,
      totalValue,
    }),
    [
      bag,
      bagSize,
      cleanBag,
      addProduct,
      removeProduct,
      checkProduct,
      totalValue,
      increaseProductQuantity,
      decreaseProductQuantity,
    ]
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
