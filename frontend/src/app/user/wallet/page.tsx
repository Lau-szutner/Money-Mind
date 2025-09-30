'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import decodeToken from '@/app/utils/decodeToken.js';

// Components
import TransactionsPie from '@/app/components/TransactionsPie';
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import Tracker from '@/app/components/Tracker';
import Categories from '@/app/components/Categories';
import Goals from '@/app/user/wallet/components/Goals';
type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: string;
  title: string;
  [key: string]: any; // Extra props permitidas
};

export default function Wallet() {
  const [user, setUser] = useState({
    id: null as string | null,
    token: null as string | null,
    isLoggedIn: false,
    authReady: false,
  });

  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [spends, setSpends] = useState(0);
  const [balance, setBalance] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    return Cookies.get('selectedMonth') || '';
  });

  const router = useRouter();

  // Validar token y obtener id
  useEffect(() => {
    const tokenData = decodeToken();
    if (!tokenData) {
      router.push('/login');
      return;
    }

    setUser({
      id: tokenData.id,
      token: tokenData.token,
      isLoggedIn: true,
      authReady: true,
    });
    setLoading(false);
  }, [router]);

  // fetchTransactions memoizado
  const fetchTransactions = useCallback(
    async (year?: number, month?: number) => {
      if (!user.token) return;

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
            Authorization: `Bearer ${user.token}`,
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
    [user.token]
  );

  // Cuando auth está listo y hay mes seleccionado, llamo fetch
  useEffect(() => {
    if (user.authReady && selectedMonth) {
      const [yearStr, monthStr] = selectedMonth.split('-');
      fetchTransactions(Number(yearStr), Number(monthStr));
    }
  }, [user.authReady, selectedMonth, fetchTransactions]);

  // useEffect(() => {
  //   try {
  //     const res = await fetch(
  //       'http://localhost:4000/transactions/filter/by-month'
  //     );
  //   } catch (error) {}
  // });

  // Cambio de mes por Balance
  const handleDateSelected = (year: number, month: number) => {
    const monthStr = `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}`;
    setSelectedMonth(monthStr);
  };

  if (loading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center">
      <div className="w-10/12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-5">
          <div className="grid gap-5 h-fit">
            <Balance
              income={income}
              spends={spends}
              saving={`${balance.toFixed(2)}`}
              onDateSelected={handleDateSelected}
              onTransactionAdded={() => {
                if (selectedMonth) {
                  const [yearStr, monthStr] = selectedMonth.split('-');
                  fetchTransactions(Number(yearStr), Number(monthStr));
                }
              }}
              month={selectedMonth}
            />
            <TransactionsPie transactions={transactions} />
            <Goals />
          </div>

          <TransactionsList
            transactions={transactions}
            token={user.token || ''}
            refreshTransactions={() => {
              if (selectedMonth) {
                const [yearStr, monthStr] = selectedMonth.split('-');
                fetchTransactions(Number(yearStr), Number(monthStr));
              }
            }}
          />
        </div>
        {/* <Tracker title="tiITIT" /> */}
      </div>
    </div>
  );
}
