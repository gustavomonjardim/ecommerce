import propTypes from 'prop-types';
import React from 'react';

import { BagProvider } from '../../context/BagContext';
import { ProductPageTemplate } from '../../templates/product';

const ProductPagePreview = ({ entry, getAsset, fieldsMetaData }) => {
  const data = entry.get('data').toJS();
  const seller = fieldsMetaData.getIn(['seller', 'sellers', data.seller]);

  return (
    <BagProvider>
      <ProductPageTemplate
        image={getAsset(entry.getIn(['data', 'image']))}
        name={entry.getIn(['data', 'name'])}
        price={entry.getIn(['data', 'price'])}
        description={entry.getIn(['data', 'description'])}
        quantity={1}
        seller={seller?.get('name')}
      />
    </BagProvider>
  );
};

ProductPagePreview.propTypes = {
  entry: propTypes.shape({
    getIn: propTypes.func,
    get: propTypes.func,
  }),
  fieldsMetaData: propTypes.shape({
    getIn: propTypes.func,
  }),
  getAsset: propTypes.func,
};

export default ProductPagePreview;
