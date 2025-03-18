import React from 'react';
import InputField from './InputField';
const FormRegister = () => {
  return (
    <form
      // action="POST"
      className="bg-bgComponents rounded-lg text-2xl flex flex-col w-9/12 p-5 gap-5 lg:w-4/12"
    >
      <h1 className="mb-4 text-center">Create Account</h1>

      <InputField
        label="Email"
        name="Email"
        type="Email"
        placeholder="Enter your email"
        inputClassName="text-black"
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
  );
};

export default FormRegister;

//   function handleRegister() {
//     e.preventDefault();
//     // let email = e.target.email.value;
//     // let password = e.target.password.value;
//     // let response = await fetch('http:localhost:3001/createAccount', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({ email, password }),
//     // });
//     // let data = await response.json();
//     // console.log(data);
//     console.log(email);
//     console.log(password);
//   }
