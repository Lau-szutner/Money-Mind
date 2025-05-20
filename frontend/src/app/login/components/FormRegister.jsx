'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const FormRegister = ({ hasAccount }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Llamar a hasAccount para cambiar la pantalla
        hasAccount();
      } else {
        console.error(response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-bgComponents rounded-lg text-2xl flex flex-col w-11/12 p-5 gap-5 lg:w-6/12 xl:w-4/1 "
    >
      <h1 className="mb-4 text-center font-bold text-xl">Create Account</h1>

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Name"
        name="name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Submit
      </button>

      <button
        type="button"
        className="p-2 bg-blue-500 text-white rounded w-full bg-greenIn"
        onClick={hasAccount}
      >
        Login
      </button>
    </form>
  );
};

export default FormRegister;
