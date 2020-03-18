import React from 'react';

import SEO from '../components/SEO';
import Layout from '../layouts/Layout';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Oops</h1>
    <p>You just hit a route that doesn&#39;t exist... </p>
  </Layout>
);

export default NotFoundPage;
