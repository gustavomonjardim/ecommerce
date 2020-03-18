import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { BagProvider, useBag } from '../BagContext';

const BagWithProducts = ({ children, products }) => {
  return (
    <BagProvider>
      <BagConsumer products={products}>{children}</BagConsumer>
    </BagProvider>
  );
};

const BagConsumer = ({ children, products }) => {
  const [added, setAdded] = useState(false);
  const { addProduct, checkProduct, bag } = useBag();

  useEffect(() => {
    if (bag.length === products?.length) {
      setAdded(true);
    }
  }, [bag, products]);

  useEffect(() => {
    if (!added && products?.length > 0) {
      products.forEach(product => {
        if (!checkProduct(product.id)) {
          addProduct(product);
        }
      });
    }
  }, [products, addProduct, checkProduct, added]);

  return <div>{children}</div>;
};

BagWithProducts.propTypes = {
  products: propTypes.arrayOf(propTypes.shape),
  children: propTypes.node.isRequired,
};

BagConsumer.propTypes = {
  products: propTypes.arrayOf(propTypes.shape),
  children: propTypes.node.isRequired,
};

export default BagWithProducts;
