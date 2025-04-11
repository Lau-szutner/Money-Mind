'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import GraphicExpenses from './components/GraphicExpenses';
import { useRouter } from 'next/navigation';

//components
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import { Navbar } from '@/app/components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(''); // Usa el estado para almacenar el token
  const balance = 1;
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

  //obtiene todos los gastos del transactions list
  // useEffect(() => {
  //   if (id) {
  //     const fetchTransactionsData = async () => {
  //       try {
  //         setLoading(true);

  //         const response = await fetch(
  //           `http://localhost:4000/transactions/complete/`,
  //           {
  //             method: 'GET',
  //             headers: {
  //               Authorization: `Bearer ${token}`, // Pasamos el token en el encabezado
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           if (response.status === 404) {
  //             console.warn('No se encontraron transacciones');
  //             setTransactions([]); // Maneja el 404 devolviendo un array vacío
  //             return;
  //           }
  //           throw new Error(`Error HTTP: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setTransactions(data); // Cambia el nombre de la variable si prefieres 'transactions'
  //         console.log(data);
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchTransactionsData(); // Ejecutamos la función cuando `id` esté disponible
  //   }
  // }, [id]); // Este efecto depende solo de `id`
  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [id]);

  // Dentro del componente Home
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/transactions/complete/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setTransactions([]);
        return;
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (balance) {
    }
  }, [balance]);

  if (!isLoggedIn || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid">
      <Navbar id={id} />
      <Balance balance={`96.000`} monthly={`516.000`} saving={`48.000`} />
      <GraphicExpenses id={id} />
      <TransactionsList
        transactions={transactions}
        token={token}
        refreshTransactions={fetchTransactions}
      />
      <Footer />
    </div>
  );
}
