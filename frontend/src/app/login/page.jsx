import React from 'react';

export default function Login() {
  return (
    <div className="flex flex-col bg-background h-screen w-full">
      <form
        action=""
        className="bg-bgComponents rounded-lg text-2xl m-10 p-10 "
      >
        <h1 className="mb-4 text-center">Create Account</h1>

        <label htmlFor="email" className="flex flex-col mb-4">
          Email
          <input
            type="text"
            name="email"
            id="email"
            className="p-2 border rounded"
            placeholder="EmailExample@hotmail.com"
          />
        </label>

        <label htmlFor="password" className="flex flex-col mb-4">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
