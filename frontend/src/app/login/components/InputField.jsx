'use client';

import { useState } from 'react';

const InputField = ({
  label,
  name,
  value = '', // Valor inicial por defecto
  placeholder,
  type = 'text',
  inputClassName = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    console.log(newValue); // Imprime el valor actualizado
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${inputClassName}`}>
      <label htmlFor={name} className="text-lg font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={inputValue} // Usa el estado local
        onChange={handleChange} // Pasa el evento correctamente
        placeholder={placeholder}
        required
        className={`bg-[#E2E5E5] h-14 rounded-lg p-4 text-black w-full`}
      />
    </div>
  );
};

export default InputField;
