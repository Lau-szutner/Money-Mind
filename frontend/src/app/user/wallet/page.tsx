'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// components
import { TransactionsGrap } from '@/app/components/TransactionsGrap';
import { Balance } from '@/app/components/Balance';
import { TransactionsList } from '@/app/components/TransactionsList';
import Tracker from '@/app/components/Tracker';

// Type of each transaction
type Transaction = {
  id: string;
  type: 'income' | 'expense';
  title: string; // <-- necesario
  amount: string;
  [key: string]: any;
};

export default function Wallet() {
  // credentials
  const [id, setId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  // Loading page
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Transactions and stuff
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [spends, setSpends] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  const router = useRouter();

  // Set session or return to login
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
      console.error('Error decoding token', error);
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [id]);

  // fetch all transactions by month
  const fetchTransactions = async (year?: number, month?: number) => {
    try {
      setLoading(true);
      let url = 'http://localhost:4000/transactions/filter/by-month'; //url just for dev
      if (year && month) {
        // "validations"
        url += `?year=${year}&month=${month}`; // query for extracting the year and month
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

      const data: Transaction[] = await response.json(); //take the reponse and json it throught data const
      // console.log(data);
      setTransactions(data); // changing data

      const incomes = data.filter((item) => item.type === 'income'); // filter to sort all incomes
      // console.log(incomes);
      const expenses = data.filter((item) => item.type === 'expense'); // filter to sort all expenses

      const totalIncome = incomes.reduce(
        (acc, item) => acc + parseFloat(item.amount as string), // take eacht income and reducit to get the total, as string becouse it cames from json
        0
      );

      const totalSpends = expenses.reduce(
        (acc, item) => acc + parseFloat(item.amount as string),
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
    <div className="grid w-full place-items-center h-full">
      <div className="w-10/12">
        <div className="flex justify-around">
          <Balance
            income={income}
            spends={spends}
            saving={`48.000`}
            onDateSelected={fetchTransactions}
          />
          <TransactionsGrap transactions={transactions} />
        </div>
        <div className="w-full flex">
          <TransactionsList
            transactions={transactions}
            token={token}
            refreshTransactions={fetchTransactions}
          />
          <Tracker title="tiITIT"></Tracker>
        </div>
      </div>
    </div>
  );
}
