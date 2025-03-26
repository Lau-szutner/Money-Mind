'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter
import Cookies from 'js-cookie'; // Importamos js-cookie
import { Balance } from '@/app/components/Balance';
import { Spends } from '@/app/components/Spends';

import spendsData from '@/app/db/spends-data.json';
import { Navbar } from '@/app/components/Navbar';
import Footer from './components/Footer';
import GraphicExpenses from './components/GraphicExpenses';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Usamos el hook useRouter para redirigir

  // Usamos useEffect para hacer la verificación cuando el componente se monta
  useEffect(() => {
    // Comprobamos si existe la cookie 'authToken'
    const token = Cookies.get('authToken');

    // Si el token no existe, redirigimos al usuario a la página de login
    if (!token) {
      router.push('/login'); // Redirige a la ruta /login
    } else {
      setIsLoggedIn(true); // Si el token existe, se considera que está logueado
    }
  }, [router]); // Aseguramos que el router se pase a useEffect

  // Si no está logueado, no renderizamos nada (o puedes mostrar un loader si lo prefieres)
  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid">
      <Navbar />
      <Balance balance={`96.000`} monthly={`516.000`} saving={`48.000`} />
      <GraphicExpenses />
      <Spends spendsList={spendsData} />

      <Footer />
    </div>
  );
}
