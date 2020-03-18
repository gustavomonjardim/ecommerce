import propTypes from 'prop-types';
import React from 'react';

import { InfoCircle } from '../../assets/svg/InfoCircle';

const Error = ({ text }) => {
  return (
    <div className="w-full max-w-xl flex flex-row items-center bg-red-600 rounded py-2 px-4 my-4 mx-4 text-white font-semibold">
      <div>
        <div className="w-8 h-8">
          <InfoCircle />
        </div>
      </div>

      <span className="leading-tight ml-4">{text}</span>
    </div>
  );
};

Error.propTypes = {
  text: propTypes.string.isRequired,
};

export default Error;
