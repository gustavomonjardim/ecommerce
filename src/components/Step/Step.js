import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

import Check from '../../assets/svg/Check';

const Step = ({ title, number, active, checked, onClick }) => {
  const stepClass = classNames(
    'rounded-full h-10 w-10 flex items-center justify-center border-black border-2 shadow-sm',
    {
      'text-black': checked,
      'text-white': active && !checked,
      'bg-black': active && !checked,
    }
  );

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className={stepClass}>
        {!checked && <span className="font-semibold text-sm">{number}</span>}
        {checked && <Check />}
      </div>
      <button
        onClick={checked ? onClick : () => {}}
        className="uppercase text-gray-900 font-semibold text-xs text-center mt-4 focus:shadow-outline"
      >
        {title}
      </button>
    </div>
  );
};

Step.propTypes = {
  title: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  active: propTypes.bool.isRequired,
  checked: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Step;
