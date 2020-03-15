import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';

import ProductCard from '../components/ProductCard';
import Layout from '../layouts/Layout';

const Shop = ({ data }) => {
  const products = useMemo(() => {
    return data.allMarkdownRemark.nodes.map(product => ({
      id: product.id,
      image: product.frontmatter.image,
      price: product.frontmatter.price,
      description: product.frontmatter.description,
      name: product.frontmatter.name,
      seller: product.frontmatter.seller,
      slug: product.fields.slug,
    }));
  }, [data]);
  return (
    <Layout title="Shop">
      <div className="w-full">
        <h1 className="text-black font-thin text-5xl md:text-6xl mb-12">
          Plants.<span className="text-green-600">All</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { new: { eq: true } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
          price
          image {
            childImageSharp {
              fluid(maxWidth: 272, maxHeight: 363, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          seller {
            id
            name
          }
        }
      }
    }
  }
`;

Shop.propTypes = {
  data: propTypes.shape({
    allMarkdownRemark: propTypes.shape({
      nodes: propTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Shop;
