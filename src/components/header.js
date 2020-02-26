import { Link } from 'gatsby';
import propTypes from 'prop-types';
import React, { useState } from 'react';

import BagIcon from '../assets/svg/BagIcon';
import MenuIcon from '../assets/svg/MenuIcon';

const HeaderLink = ({ children, path }) => {
  return (
    <Link
      href={path}
      className="cursor-pointer block p-4 font-semibold text-black sm:p-0 sm:m-0 sm:border-none sm:mx-4"
    >
      {children}
    </Link>
  );
};

Link.propTypes = {
  children: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
};

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex flex-row items-baseline justify-between px-6 py-6 bg-white">
      <div className="w-full flex flex-col items-start sm:items-baseline sm:justify-between sm:flex-row">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-black h-6 w-6 mr-4 sm:hidden focus:outline-none"
          >
            <MenuIcon open={open} />
          </button>
          <h1 className="text-xl font-semibold text-black">Plants.</h1>
        </div>

        <div
          className={`${
            open ? 'flex' : 'hidden'
          } w-full flex-col mt-4 sm:my-0 sm:w-auto sm:flex sm:flex-row sm:items-center`}
        >
          <HeaderLink path="/">All</HeaderLink>
          <HeaderLink path="/">New</HeaderLink>
          <HeaderLink path="/">On Sale</HeaderLink>
          <button
            type="button"
            className="cursor-pointer hidden text-black h-6 w-6 mr-4 focus:outline-none sm:block sm:ml-8"
          >
            <BagIcon />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="cursor-pointer text-black h-6 w-6 mr-4 focus:outline-none sm:hidden  sm:ml-8"
      >
        <BagIcon />
      </button>
    </header>
  );
};

export default Header;
