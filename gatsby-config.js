const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: `Plants`,
    description: `ECommerce application built with Gatsby, React, Tailwind, Netlify and Netlify CMS`,
    author: `Gustavo Monjardim`,
  },
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy.createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss',
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Plants.`,
        short_name: `Plants.`,
        description:
          'ECommerce application built with Gatsby, React, Tailwind, Netlify and Netlify CMS',
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#000`,
        display: `fullscreen`,
        icon: `src/assets/images/logo.png`, // This path is relative to the root of the site.
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
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify',
    `gatsby-plugin-offline`,
  ],
  mapping: {
    'MarkdownRemark.frontmatter.seller': 'SellersJson',
  },
};
