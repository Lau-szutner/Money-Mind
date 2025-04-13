'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import GraphicExpenses from './components/GraphicExpenses';
import { useRouter } from 'next/navigation';

// components
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
  const [token, setToken] = useState('');

  const [income, setIncome] = useState(0);
  const [spends, setSpends] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    setToken(token);

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

  const fetchTransactions = async (year, month) => {
    try {
      setLoading(true);
      const url = `http://localhost:4000/transactions/filter/by-month?year=${year}&month=${month}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setTransactions([]);
        setIncome(0);
        setSpends(0);
        setBalance(0);
        return;
      }

      const data = await response.json();
      setTransactions(data);

      const incomes = data.filter((item) => item.type === 'income');
      const expenses = data.filter((item) => item.type === 'expense');

      const totalIncome = incomes.reduce(
        (acc, item) => acc + parseFloat(item.amount),
        0
      );
      const totalSpends = expenses.reduce(
        (acc, item) => acc + parseFloat(item.amount),
        0
      );
      const totalBalance = totalIncome - totalSpends;

      setIncome(totalIncome);
      setSpends(totalSpends);
      setBalance(totalBalance);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid">
      <Navbar id={id} />
      <Balance
        income={income}
        spends={spends}
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
