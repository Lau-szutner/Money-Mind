'use client';

import { React, useState, useEffect } from 'react';
import FormRegister from './components/FormRegister';
import DoLogin from './components/DoLogin';

export default function Login() {
  const [hasAccount, setHasAccount] = useState(false);

  const hello = function () {
    console.log('hello');
  };
  return (
    <div className="flex flex-col bg-background h-screen w-full items-center justify-center">
      {hasAccount ? (
        <DoLogin hasAccount={() => setHasAccount(false)}></DoLogin>
      ) : (
        <FormRegister hasAccount={() => setHasAccount(true)}></FormRegister>
      )}

      {/* <DoLogin onShow={() => setActiveIndex(0)}></DoLogin>
      <FormRegister onShow={() => setActiveIndex(1)}></FormRegister> */}
    </div>
  );
}
