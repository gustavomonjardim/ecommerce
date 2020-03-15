import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React from 'react';

import ProductCard from '../components/ProductCard';
import Layout from '../layouts/Layout';

const Shop = ({ data }) => {
  return (
    <Layout title="On Sale">
      <div className="w-full">
        <h1 className="text-black font-thin text-5xl md:text-6xl mb-12">
          Plants.<span className="font-sans text-green-600">New</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {data.allProductsJson.nodes.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allProductsJson(filter: { new: { eq: true } }) {
      nodes {
        id
        name
        price
        image
        fields {
          slug
        }
        seller {
          id
          name
        }
      }
    }
  }
`;

Shop.propTypes = {
  data: propTypes.shape({
    allProductsJson: propTypes.shape({
      nodes: propTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Shop;
