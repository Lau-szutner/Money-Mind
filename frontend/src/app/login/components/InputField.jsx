'use client';

import { useState } from 'react';

const InputField = ({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  inputClassName = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (x) => {
    setInputValue(x);
    console.log(inputValue);
  };
  return (
    <div className={`flex flex-col gap-3 w-full ${inputClassName}`}>
      <label htmlFor={name} className="text-lg font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={() => handleChange(inputValue)}
        placeholder={placeholder}
        required
        className={`bg-[#E2E5E5] h-14 rounded-lg p-4 text-base w-full`}
      />
    </div>
  );
};
export default InputField;
