import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className={`min-w-screen min-h-screen flex flex-row bg-white relative overflow-hidden`}>
      <div className="min-w-screen min-h-screen flex flex-col container mx-auto antialiased">
        <header className="flex flex-row items-baseline justify-between px-6 py-6 border-solid border-b border-gray-300">
          <div className="w-full flex items-center justify-center">
            <Link to="/">
              <h1 className="text-3xl font-thin text-black">Plants.</h1>
            </Link>
          </div>
        </header>
        <main className="w-full flex flex-grow flex-col items-center sm:my-12">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
