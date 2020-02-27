import React from 'react';

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-black font-thin text-4xl sm:text-5xl md:text-6xl my-12">
          Plants.<span className="text-green-600">All</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
