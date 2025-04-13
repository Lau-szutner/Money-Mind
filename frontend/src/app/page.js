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

  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [id]);

  // Dentro del componente Home
  const fetchTransactions = async (year, month) => {
    console.log(year, month);
    try {
      setLoading(true);
      // Agregar los parámetros como query en la URL
      const url = `http://localhost:4000/transactions/filter/by-month?year=${year}&month=${month}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      <Balance
        balance={`96.000`}
        monthly={`516.000`}
        saving={`48.000`}
        onDateSelected={fetchTransactions}
      />
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
