# Plants Ecommerce

[![codecov](https://codecov.io/gh/gustavomonjardim/ecommerce/branch/master/graph/badge.svg)](https://codecov.io/gh/gustavomonjardim/ecommerce)
![CI](https://github.com/gustavomonjardim/ecommerce/workflows/CI/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a3d35ad5-b39c-4738-a425-3a8b23256c5d/deploy-status)](https://app.netlify.com/sites/plantstore/deploys)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)


This project is an Ecommerce application built with Gatsby, React, Tailwind, Netlify, Netlify CMS and pagarme.js

It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment and CDN distribution.

## Prerequisites

- [Node](https://nodejs.org/en/)
- [yarn](https://classic.yarnpkg.com/)

## Getting started

1. Clone the project

```shell
$ git clone https://github.com/gustavomonjardim/ecommerce.git
```

2. Install the dependencies:

```shell
$ yarn
```

3. Run the project

```shell
$ yarn start
```

4. Genearating a production build

```shell
$ yarn build
```

## Technologies

- Gatsby
- React
- Tailwind CSS
- Netlify
- Netlify CMS
- pagarme.js
- Formik
- Yup


## Project structure

```
/src
|-- /assets
    |-- /fonts
    |-- /images
    |-- /svg
|-- /cms
|-- /components
|-- /content
|-- /context
|-- /forms
|-- /functions
|-- /hooks
|-- /layouts
|-- /pages
|-- /services
|-- /styles
|-- /templates
```

- **`/assets`**: Images, fonts and icons are stored in this folder.
- **`/cms`**: This folder contains the Netlify CMS configuration for registering preview templates.
- **`/components`**: Contains reusables components used throughout the whole application.
- **`/content`**: Content upload by the CMS is stored in this folder.
- **`/context`**: Providers and consumers built with the [React Context API](https://reactjs.org/docs/context.html) are stored in this folder.
- **`/forms`**: This folder contains all the forms used in the checkout page.
- **`/functions`**: This folder hosts all [Netlify lambda functions](https://docs.netlify.com/functions/overview/).
- **`/hooks`**: Custom [React hooks](https://reactjs.org/docs/hooks-custom.html) are stored in this folder.
- **`/layouts`**: Components responsible for managing common page elements, such as markup, styles, and functionality across multiple pages. Learn more [here](https://www.gatsbyjs.org/docs/recipes/pages-layouts/).
- **`/pages`**: Components under src/pages become pages automatically with paths based on their file name.
- **`/services`**: This folder hosts services and funcionalities used throughout the application.
- **`/styles`**: Global styles are stored in this folder
- **`/templates`**: Contains templates for programmatically creating pages.


To learn more about Gatsby project structure, check out the documentation [here](https://www.gatsbyjs.org/docs/gatsby-project-structure/).

## Netlify CMS

## Testing

```shell
$ yarn test
```

## License

Licensed under the [MIT License](./LICENSE).

