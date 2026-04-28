import React, { useState } from 'react';
import Cookies from 'js-cookie';

import { categoryIncomeData, categorySpendData } from '@/app/utils/categories';

type NewTransactionProps = {
  type: string;
  title: string;
  onTransactionAdded: () => void;
};

const NewTransaction: React.FC<NewTransactionProps> = ({
  type,
  title,
  onTransactionAdded,
}) => {
  const [transactionData, setTransactionData] = useState({
    user_id: '',
    title: '',
    description: '',
    category: '',
    photo: '',
    date: '',
    type: type,
    amount: '',
  });

  const token = Cookies.get('authToken');

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      if (onTransactionAdded) {
        onTransactionAdded();
      }

      setTransactionData({
        user_id: '',
        title: '',
        description: '',
        category: '',
        photo: '',
        date: '',
        type: type,
        amount: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="font-regular">
      <div className="bg-bgComponents p-5 rounded-lg m-5">
        <h1 className="font-bold text-center my-2">{title}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            className="p-1 rounded w-full text-gray-500 text-center"
            placeholder="Titulo"
            name="title"
            value={transactionData.title}
            onChange={handleChangeData}
          />
          <input
            type="text"
            className="p-1 rounded w-full text-gray-500 text-center"
            placeholder="Descripción"
            name="description"
            value={transactionData.description}
            onChange={handleChangeData}
          />

          <select
            name="category"
            className="p-1 rounded w-full text-gray-500 text-center"
            value={transactionData.category}
            onChange={handleChangeData}
          >
            <option value="">Seleccionar categoría</option>
            {type === 'income'
              ? categoryIncomeData.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))
              : categorySpendData.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
          </select>

          <input
            type="date"
            className="p-1 rounded w-full text-gray-500 text-center"
            placeholder="date"
            name="date"
            value={transactionData.date}
            onChange={handleChangeData}
          />
          <input
            type="number"
            className="p-1 rounded w-full text-gray-500 text-center"
            placeholder="Monto"
            name="amount"
            value={transactionData.amount}
            onChange={handleChangeData}
          />
          <button
            type="submit"
            className={`py-1 px-10  rounded w-full text-white font-semibold shadow-custom ${
              type === 'income' ? 'bg-greenIn' : 'bg-redSpend'
            }`}
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransaction;
