'use client';

import React, { useState } from 'react';
import InputField from './InputField';

const DoLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log('Email:', formData.email);
    console.log('Password:', formData.password);

    try {
      const response = await fetch('http://localhost:4000/routes/DoLogin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-bgComponents rounded-lg text-2xl flex flex-col w-9/12 p-5 gap-5 lg:w-4/12"
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
    </form>
  );
};

export default DoLogin;
