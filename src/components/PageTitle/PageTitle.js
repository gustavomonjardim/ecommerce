import propTypes from 'prop-types';
import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <h1 className="text-black text-4xl sm:text-5xl md:text-6xl mb-12">
      Plants.<span className="text-green-600">{title}</span>
    </h1>
  );
};

PageTitle.propTypes = {
  title: propTypes.string.isRequired,
};

export default PageTitle;
