import PropTypes from 'prop-types';
import React from 'react';

import Bag from '../../components/Bag';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SEO from '../../components/SEO';
import { useBagDisplay } from '../../context/BagDisplayContext';

const Layout = ({ children, title }) => {
  const isBagOpen = useBagDisplay();
  return (
    <>
      <SEO title={title} />
      <div
        className={`min-w-screen min-h-screen ${
          isBagOpen ? 'max-h-screen' : ''
        } flex flex-row bg-white relative overflow-hidden`}
      >
        <div className="min-w-screen min-h-screen flex flex-col container mx-auto antialiased">
          <Header />
          <main className="w-full flex flex-grow flex-col items-center mb-12 px-6">{children}</main>
          <Footer />
        </div>
        <Bag />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
