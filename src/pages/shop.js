import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

const Shop = ({ data }) => {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-black font-thin text-5xl md:text-6xl mb-12">
          Plants.<span className="text-green-600">All</span>
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
    allProductsJson {
      nodes {
        id
        name
        price
        image
        seller {
          id
          name
        }
      }
    }
  }
`;

export default Shop;
