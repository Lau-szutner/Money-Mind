'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import InputField from './InputField';

const DoLogin = ({ hasAccount }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDoLogin = async (e) => {
    e.preventDefault();

    console.log('Email:', formData.email);
    console.log('Password:', formData.password);

    try {
      const response = await fetch('http://localhost:4000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos el token en la cookie
        Cookies.set('authToken', data.token, {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        }); // Expira en 1 día

        console.log('Login exitoso', data);
      } else {
        console.error('Error en el login:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleDoLogin}
      className="bg-bgComponents rounded-lg text-2xl flex flex-col w-9/12 p-5 gap-5 lg:w-4/12"
    >
      <h1 className="mb-4 text-center font-bold text-xl">Login</h1>

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        name="password"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Login
      </button>
      <button
        type="button"
        className="p-2 bg-blue-500 text-white rounded w-full bg-greenIn"
        onClick={hasAccount}
      >
        I don't have a account
      </button>
    </form>
  );
};

export default DoLogin;
