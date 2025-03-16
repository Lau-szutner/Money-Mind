import React from 'react';
import InputField from './InputField';
export default function Login() {
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
    <div className="flex flex-col bg-background h-screen w-full items-center justify-center">
      <form
        // action="POST"
        className="bg-bgComponents rounded-lg text-2xl m-10 p-10 w-6/12 flex flex-col gap-6"
      >
        <h1 className="mb-4 text-center">Create Account</h1>

        <InputField
          label="Email"
          name="Email"
          type="Email"
          placeholder="Enter your email"
        />

        <InputField
          label="Name"
          name="Name"
          type="Name"
          placeholder="Enter your name"
        />

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
