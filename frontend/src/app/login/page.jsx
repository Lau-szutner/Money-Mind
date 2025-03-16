'use client';
import React from 'react';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    e.preventDefault();
    // let email = e.target.email.value;
    // let password = e.target.password.value;
    // let response = await fetch('http:localhost:3001/createAccount', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // let data = await response.json();
    // console.log(data);
    console.log(email);
    console.log(password);
  }

  return (
    <div className="flex flex-col bg-background h-screen w-full">
      <form
        // action="POST"
        className="bg-bgComponents rounded-lg text-2xl m-10 p-10 "
      >
        <h1 className="mb-4 text-center">Create Account</h1>

        <label htmlFor="email" className="flex flex-col mb-4">
          Email
          <input
            type="text"
            name="email"
            id="email"
            className="p-2 border rounded text-black"
            placeholder="EmailExample@hotmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password" className="flex flex-col mb-4">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border rounded text-black"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
          onClick={() => handleRegister()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
