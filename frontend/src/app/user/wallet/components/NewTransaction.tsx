import React, { useState } from 'react';
import Cookies from 'js-cookie';
import * as z from 'zod';

import { categoryIncomeData, categorySpendData } from '@/app/utils/categories';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type NewTransactionProps = {
  type: string;
  title: string;
  onTransactionAdded: () => void;
};

const newTransactionSchema = z.object({
  title: z.string().trim().min(1, 'El titulo es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  category: z.string().min(1, 'La categoria es obligatoria'),
  date: z.string().min(1, 'La fecha es obligatoria'),
  amount: z.string().min(1, 'El monto es obligatorio'),
});

export const NewTransaction = ({
  type,
  title,
  onTransactionAdded,
}: NewTransactionProps) => {
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

  const [formError, setFormError] = useState('');

  const token = Cookies.get('authToken');

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const result = newTransactionSchema.safeParse(transactionData);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      setFormError(firstError || 'Revisa los campos');
      return;
    } else {
      result.data;
    }

    const validData = result.data;

    const parsedAmount = Number(transactionData.amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setFormError('El monto debe ser mayor a 0');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validData),
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
          {formError && (
            <div className="p-1 text-red-600 bg-red-50 border border-red-200 rounded flex gap-2 justify-center">
              <span>{formError}</span>
            </div>
          )}

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
