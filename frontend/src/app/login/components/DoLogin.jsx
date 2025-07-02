'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import InputField from './InputField';
import { useRouter } from 'next/navigation';

const DoLogin = ({ hasAccount }) => {
  const [userNotFound, setUserNotFound] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDoLogin = async (e) => {
    e.preventDefault();

    // console.log('Email:', formData.email);
    // console.log('Password:', formData.password);

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
        // Save the token in cookies
        Cookies.set('authToken', data.token, {
          expires: 10,
          secure: true,
          sameSite: 'Strict',
        });
        router.push('/user/wallet');
        console.log('Login successful', data);
      } else {
        console.log('Server responded with error:', data);

        if (data.error === 'User not found.') {
          setUserNotFound(true);
          setTimeout(() => {
            setUserNotFound(false);
          }, 4000);
        } else if (data.error === 'Incorrect password.') {
          setPasswordIncorrect(true);
          setTimeout(() => {
            setPasswordIncorrect(false);
          }, 4000);
        }

        // console.error('Login error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleDoLogin}
      className="bg-bgComponents rounded-lg text-xl flex flex-col w-11/12 p-5 gap-5 lg:w-4/12"
    >
      <h1 className="loginFormTitle">Login</h1>

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
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex items-center justify-between w-full">
        <label className="flex items-center gap-2">
          Remember me
          <input type="checkbox" />
        </label>
        <button type="button" className="hover:underline">
          Forgot password?
        </button>
      </div>

      {userNotFound && (
        <div className="bg-redSpend p-3 rounded-md text-center">
          User not Found, please enter a valid user
        </div>
      )}
      {passwordIncorrect && (
        <div className="bg-redSpend p-3 rounded-md text-center">
          Password incorrect, please enter a valir password
        </div>
      )}

      <button
        type="submit"
        className="p-2 bg-greenIn text-white rounded w-full"
      >
        Login
      </button>

      <div className="flex gap-3 justify-center">
        <p>Already have and account?</p>
        <button className="font-bold" onClick={hasAccount}>
          Login
        </button>
      </div>
    </form>
  );
};

export default DoLogin;
