import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';

import ProductCard from '../components/ProductCard';
import Layout from '../layouts/Layout';

const Seller = ({ data }) => {
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
        <h1 className="text-black font-light text-4xl sm:text-5xl md:text-6xl mb-12">
          Plants.<span className="text-green-600">{data.sellersJson.name}</span>
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
  query ProductsBySeller($id: String!) {
    sellersJson(id: { eq: $id }) {
      name
    }
    allMarkdownRemark(filter: { frontmatter: { seller: { id: { eq: $id } } } }) {
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
              fluid(maxWidth: 272, maxHeight: 363, quality: 50) {
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

Seller.propTypes = {
  data: propTypes.shape({
    sellersJson: propTypes.shape({
      name: propTypes.string,
    }),
    allMarkdownRemark: propTypes.shape({
      nodes: propTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Seller;
