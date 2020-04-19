import { Link } from 'gatsby';
import propTypes from 'prop-types';
import React, { useState } from 'react';

import BagIcon from '../../assets/svg/BagIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import { useBag } from '../../context/BagContext';

const HeaderLink = ({ children, path }) => {
  return (
    <Link
      to={path}
      className="cursor-pointer block p-4 font-semibold text-base leading-thight tracking-wide text-black hover:opacity-50 sm:p-0 sm:m-0 sm:border-none sm:mx-4"
    >
      {children}
    </Link>
  );
};

HeaderLink.propTypes = {
  children: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
};

const Header = ({ showBag }) => {
  const [open, setOpen] = useState(false);
  const { bagSize } = useBag();

  return (
    <header className="flex flex-row items-baseline justify-between px-6 py-6 mb-12 border-solid border-b border-gray-300">
      <div className="w-full flex flex-col items-start sm:items-baseline sm:justify-between sm:flex-row">
        <div className="flex items-center">
          <button
            aria-label="Menu"
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-black h-6 w-6 mr-4 sm:hidden focus:outline-none focus:shadow-outline"
          >
            <MenuIcon open={open} />
          </button>
          <Link to="/">
            <h1 className="text-3xl text-black">Plants.</h1>
          </Link>
        </div>

        <div
          className={`${
            open ? 'flex' : 'hidden'
          } w-full flex-col mt-4 sm:my-0 sm:w-auto sm:flex sm:flex-row sm:items-center`}
        >
          <HeaderLink path="/">All</HeaderLink>
          <HeaderLink path="/new">New</HeaderLink>
          <HeaderLink path="/on-sale">On Sale</HeaderLink>
          <button
            aria-label="Show Bag"
            onClick={showBag}
            type="button"
            className="relative cursor-pointer hidden text-black h-6 w-6 mr-4 mb-1 focus:outline-none focus:shadow-outline sm:block sm:ml-8"
          >
            <BagIcon />
            <div className="absolute right-0 top-0 -mr-3 -mt-2 bg-black rounded-full h-5 w-5 flex items-center justify-center">
              <span className="text-white font-semibold text-2xs">{bagSize}</span>
            </div>
          </button>
        </div>
      </div>

      <button
        aria-label="Show Bag"
        onClick={showBag}
        type="button"
        className="relative cursor-pointer text-black h-6 w-6 mr-4 mb-1 focus:outline-none focus:shadow-outline sm:hidden sm:ml-8"
      >
        <BagIcon />
        <div className="absolute right-0 top-0 -mr-3 -mt-2 bg-black rounded-full h-5 w-5 flex items-center justify-center">
          <span className="text-white font-semibold text-2xs">{bagSize}</span>
        </div>
      </button>
    </header>
  );
};

Header.propTypes = {
  showBag: propTypes.func.isRequired,
};

export default Header;
