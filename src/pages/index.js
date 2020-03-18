import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';

import PageTitle from '../components/PageTitle';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import Layout from '../layouts/Layout';
import { productFactory } from '../services/productFactory';

const Shop = ({ data }) => {
  const products = useMemo(() => {
    return data.allMarkdownRemark.nodes.map(productFactory);
  }, [data]);

  return (
    <Layout title="Shop">
      <div className="w-full">
        <PageTitle title="All" />
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
  query {
    allMarkdownRemark {
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

Shop.propTypes = {
  data: propTypes.shape({
    allMarkdownRemark: propTypes.shape({
      nodes: propTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Shop;
