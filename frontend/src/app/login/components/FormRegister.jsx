'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const FormRegister = ({ hasAccount }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    Rpassword: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.Rpassword) {
      return;
    }

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
      className="bg-bgComponents rounded-lg text-xl flex flex-col w-11/12 p-5 gap-5 lg:w-4/12"
    >
      <h1 className="loginFormTitle">Registration</h1>

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

      <InputField
        label="Repeat Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.Rpassword}
        onChange={handleChange}
      />

      <label htmlFor="subscribeNews ">
        <input type="checkbox" /> I agree to the{' '}
        <span className="text-greenIn">terms and conditions?</span>
      </label>
      <button
        type="submit"
        className="p-2 bg-greenIn text-white rounded w-full"
      >
        Register
      </button>

      <div className="flex gap-3 justify-center">
        <p>Already have and account?</p>
        <button className="font-bold" onClick={hasAccount}>
          Login
        </button>
      </div>

      {/* <button
        type="button"
        className="p-2 bg-blue-500 text-white rounded w-full bg-greenIn"
        
      >
        Login
      </button> */}
    </form>
  );
};

export default FormRegister;
