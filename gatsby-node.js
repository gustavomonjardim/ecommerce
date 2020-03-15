const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const products = result.data.allMarkdownRemark.nodes;

    products.forEach(product => {
      const id = product.id;
      createPage({
        path: `/products${product.fields.slug}`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
