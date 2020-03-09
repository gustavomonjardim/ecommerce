const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: `Plants`,
    description: `ECommerce application built with Gatsby, React, Tailwind, Netlify and Netlify CMS`,
    author: `Gustavo Monjardim`,
  },
  developMiddleware: app => {
    app.use(
      '/.netlify/lambda/',
      proxy.createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/lambda/': '',
        },
      })
    );
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sellers`,
        path: `${__dirname}/src/content/sellers`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/content/products`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: false,
        tailwind: true,
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
  ],
  mapping: {
    'ProductsJson.seller': 'SellersJson',
  },
};
