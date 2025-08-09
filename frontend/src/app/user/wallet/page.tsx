'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Components
import { TransactionsGrap } from '@/app/components/TransactionsGrap';
import ChartTransactions from '@/app/components/ChartTransactions';
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import Tracker from '@/app/components/Tracker';

type Transaction = {
  id: number;
  title: string;
  type: string;
  amount: string;
  description: string;
  category: string;
  photo: string | null;
  createdAt: string;
  date: string;
  fk_user_id: number;
  updatedAt: string;
};

export default function Wallet() {
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState<boolean>(false); // <--- nuevo

  const [loading, setLoading] = useState<boolean>(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [spends, setSpends] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    return Cookies.get('selectedMonth') || '';
  });

  const router = useRouter();

  // Validar token y obtener id
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
      setAuthReady(true); // <-- Indico que ya puedo hacer fetch
    } catch (error) {
      console.error('Error decoding token', error);
      router.push('/login');
    }
  }, [router]);

  // fetchTransactions memoizado para evitar recreaciones innecesarias
  const fetchTransactions = useCallback(
    async (year?: number, month?: number) => {
      if (year && month) {
        const monthString = `${year.toString().padStart(4, '0')}-${month
          .toString()
          .padStart(2, '0')}`;
        Cookies.set('selectedMonth', monthString, { expires: 30 });
      }
      try {
        setLoading(true);
        let url = 'http://localhost:4000/transactions/filter/by-month';
        if (year && month) {
          url += `?year=${year}&month=${month}`;
        }

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

        const data: Transaction[] = await response.json();

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

        setIncome(totalIncome);
        setSpends(totalSpends);
        setBalance(totalIncome - totalSpends);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Cuando auth está listo y hay mes seleccionado, llamo fetch
  useEffect(() => {
    if (authReady && selectedMonth) {
      const [yearStr, monthStr] = selectedMonth.split('-');
      fetchTransactions(Number(yearStr), Number(monthStr));
    }
  }, [authReady, selectedMonth, fetchTransactions]);

  // Cambio de mes por Balance
  const handleDateSelected = (year: number, month: number) => {
    const monthStr = `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}`;
    setSelectedMonth(monthStr);
  };

  if (!isLoggedIn || loading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center">
      <div className="w-10/12">
        <div className="grid grid-cols-2 gap-5 m-5">
          <Balance
            income={income}
            spends={spends}
            saving={`${balance.toFixed(2)}`} // ahora dinámico basado en balance
            onDateSelected={handleDateSelected}
            onTransactionAdded={() => {
              // refrescar con el mes actual
              if (selectedMonth) {
                const [yearStr, monthStr] = selectedMonth.split('-');
                fetchTransactions(Number(yearStr), Number(monthStr));
              }
            }}
            month={selectedMonth}
          />

          {/* <TransactionsGrap transactions={transactions} /> */}
          <ChartTransactions transactions={transactions} />
        </div>

        <div className="grid grid-cols-2 gap-5 m-5">
          <TransactionsList
            transactions={transactions}
            token={token}
            refreshTransactions={() => {
              if (selectedMonth) {
                const [yearStr, monthStr] = selectedMonth.split('-');
                fetchTransactions(Number(yearStr), Number(monthStr));
              }
            }}
          />
          <Tracker title="tiITIT" />
        </div>
      </div>
    </div>
  );
}
