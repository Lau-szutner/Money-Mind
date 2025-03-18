'use client';

import { useState, useEffect } from 'react';

const InputField = ({
  label,
  name,
  value = '',
  placeholder,
  type = 'text',
  inputClassName = '',
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(name, newValue); // Llamo a la función que viene del padre
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${inputClassName}`}>
      <label htmlFor={name} className="text-lg font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className={`bg-[#E2E5E5] h-14 rounded-lg p-4 text-black w-full`}
      />
    </div>
  );
};

export default InputField;
