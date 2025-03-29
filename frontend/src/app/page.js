'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import { Navbar } from '@/app/components/Navbar';
import Footer from './components/Footer';
import GraphicExpenses from './components/GraphicExpenses';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(''); // Usa el estado para almacenar el token

  useEffect(() => {
    const token = Cookies.get('authToken'); // Obtienes el token de las cookies
    if (!token) {
      router.push('/login');
      return;
    }

    setToken(token); // Guarda el token en el estado

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setId(decodedToken.id);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      const fetchTransactionsData = async () => {
        try {
          setLoading(true);

          // Obtener el token almacenado en las cookies
          const token = Cookies.get('authToken');

          const response = await fetch(
            `http://localhost:4000/transactions/complete/`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`, // Pasamos el token en el encabezado
              },
            }
          );

          if (!response.ok) {
            if (response.status === 404) {
              console.warn('No se encontraron transacciones');
              setTransactions([]); // Maneja el 404 devolviendo un array vacío
              return;
            }
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          setTransactions(data); // Cambia el nombre de la variable si prefieres 'transactions'
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactionsData(); // Ejecutamos la función cuando `id` esté disponible
    }
  }, [id]); // Este efecto depende solo de `id`

  if (!isLoggedIn || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid">
      <Navbar id={id} />
      <Balance balance={`96.000`} monthly={`516.000`} saving={`48.000`} />
      <GraphicExpenses id={id} />
      <TransactionsList transactions={transactions} token={token} />
      <Footer />
    </div>
  );
}
