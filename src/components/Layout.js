import PropTypes from 'prop-types';
import React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col container mx-auto antialiased">
      <Header />
      <main className="flex flex-grow mb-12 px-6">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
