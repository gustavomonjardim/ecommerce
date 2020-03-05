import propTypes from 'prop-types';
import React from 'react';

const TextInput = ({ id, placeholder, label, value, onChange }) => {
  return (
    <div>
      <label class="block text-gray-700 text-xs font-bold mb-2" for={id}>
        {label}
      </label>
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-black"
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};

TextInput.propTypes = {
  id: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default TextInput;
