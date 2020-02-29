const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allProductsJson {
        nodes {
          id
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const products = result.data.allProductsJson.nodes;

    products.forEach(product => {
      const id = product.id;
      createPage({
        path: `/product/${product.id}`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          id,
        },
      });
    });
  });
};
