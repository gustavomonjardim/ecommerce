import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

const TextInput = ({
  id,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
  formatText,
}) => {
  const inputClass = classNames(
    'appearance-none border-2 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-black',
    {
      'bg-gray-200': !error,
      'bg-white': !!error,
      'border-gray-200': !error,
      'border-red-400': !!error,
      'focus:border-black': !error,
      'focus:border-red-400': !!error,
    }
  );

  const onChangeText = ({ target }) => {
    let { value } = target;
    if (typeof formatText === 'function') {
      value = formatText(value);
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <div className="w-full max-w-lg my-2">
      <label className="block text-gray-600 text-xs font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeText}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      {!!error && <span className="text-red-500 font-regular text-xs">{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  id: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onBlur: propTypes.func,
  error: propTypes.string,
  maxLength: propTypes.number,
  formatText: propTypes.func,
};

TextInput.defaultProps = {
  error: null,
  onBlur: () => {},
  maxLength: 200,
  formatText: null,
};

export default TextInput;
