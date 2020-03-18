import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';

import PageTitle from '../components/PageTitle';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import Layout from '../layouts/Layout';
import { productFactory } from '../services/productFactory';

const Seller = ({ data }) => {
  const products = useMemo(() => {
    return data.allMarkdownRemark.nodes.map(productFactory);
  }, [data]);

  return (
    <Layout title={data.sellersJson.name}>
      <div className="w-full">
        <PageTitle title={data.sellersJson.name} />
        <ProductGrid>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
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
