import React from 'react';
import FormRegister from './components/FormRegister';
import DoLogin from './components/DoLogin';

export default function Login() {
  return (
    <div className="flex flex-col bg-background h-screen w-full items-center justify-center">
      {/* <FormRegister></FormRegister> */}
      <DoLogin></DoLogin>
    </div>
  );
}
