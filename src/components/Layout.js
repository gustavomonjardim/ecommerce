import PropTypes from 'prop-types';
import React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen bg-white">
      <div className="min-w-screen min-h-screen flex flex-col container mx-auto antialiased">
        <Header />
        <main className="w-full flex flex-grow flex-col items-center mb-12 px-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
