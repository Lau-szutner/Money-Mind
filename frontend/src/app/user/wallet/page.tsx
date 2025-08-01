'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Components
import { TransactionsGrap } from '@/app/components/TransactionsGrap';
import ChartTransactions from '@/app/components/ChartTransactions';
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import Tracker from '@/app/components/Tracker';

// ============================
// Types
// ============================

// Define the structure of a transaction
type Transaction = {
  id: string;
  type: 'income' | 'expense';
  title: string; // <-- necesario
  amount: string;
  [key: string]: any;
};

export default function Wallet() {
  // ============================
  // State: Auth & Loading
  // ============================

  const [id, setId] = useState<string>(''); // user ID from decoded token
  const [token, setToken] = useState<string>(''); // JWT token
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // flag for auth check
  const [loading, setLoading] = useState<boolean>(true); // flag to show loading state

  // ============================
  // State: Transactions & Balances
  // ============================

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [spends, setSpends] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  const router = useRouter();

  // ============================
  // useEffect: Token validation on mount
  // ============================

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      // No token found, redirect to login
      router.push('/login');
      return;
    }

    setToken(token);

    try {
      // Decode JWT token to extract user ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setId(decodedToken.id);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error decoding token', error);
      router.push('/login');
    }
  }, [router]);

  // ============================
  // useEffect: Fetch transactions when ID is available
  // ============================

  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [id]);

  // ============================
  // Fetch: Get transactions (by month/year)
  // ============================

  const fetchTransactions = async (year?: number, month?: number) => {
    try {
      setLoading(true);

      let url = 'http://localhost:4000/transactions/filter/by-month';

      // Add query params, filtering by year/month
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
        // If request fails, reset state
        setTransactions([]);
        setIncome(0);
        setSpends(0);
        setBalance(0);
        return;
      }

      const data: Transaction[] = await response.json();

      setTransactions(data);

      console.log(data);

      // Separate transactions by type
      const incomes = data.filter((item) => item.type === 'income');
      const expenses = data.filter((item) => item.type === 'expense');

      // Sum all incomes and expenses
      const totalIncome = incomes.reduce(
        (acc, item) => acc + parseFloat(item.amount as string),
        0
      );

      const totalSpends = expenses.reduce(
        (acc, item) => acc + parseFloat(item.amount as string),
        0
      );

      const totalBalance = totalIncome - totalSpends;

      // Update state with calculated values
      setIncome(totalIncome);
      setSpends(totalSpends);
      setBalance(totalBalance);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // UI: Show loading spinner while fetching
  // ============================

  if (!isLoggedIn || loading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  // ============================
  // UI: Render dashboard
  // ============================

  return (
    <div className="grid  place-items-center ">
      <div className="w-10/12">
        <div className="grid grid-cols-2 gap-5 m-5">
          <Balance
            income={income}
            spends={spends}
            saving={`48.000`} // Este valor parece estar fijo, podrías considerarlo dinámico
            onDateSelected={fetchTransactions}
          />
          {/* <TransactionsGrap transactions={transactions} /> */}
          <ChartTransactions transactions={transactions}></ChartTransactions>
        </div>

        <div className="w-full flex">
          <TransactionsList
            transactions={transactions}
            token={token}
            refreshTransactions={fetchTransactions}
          />
          <Tracker title="tiITIT" />
        </div>
      </div>
    </div>
  );
}
