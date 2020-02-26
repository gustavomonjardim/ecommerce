import PropTypes from 'prop-types';
import React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
