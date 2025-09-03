import React, { useState, useEffect } from 'react';

export const Transaction = ({
  title,
  description,
  category,
  photo,
  date,
  type,
  amount,
  token,
  id,
  onUpdate,
}) => {
  const [edit, setEdit] = useState(false);
  const [transactionData, setTransactionData] = useState({
    title,
    description,
    category,
    photo,
    date,
    type,
    amount,
  });

  // 🛠️ Cuando edit se activa, restablece los valores con los actuales
  useEffect(() => {
    if (edit) {
      setTransactionData({
        title,
        description,
        category,
        photo,
        date,
        type,
        amount,
      });
    }
  }, [edit, title, description, category, photo, date, type, amount]);

  const handleChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token desde el estado
        },
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      onUpdate();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token desde el estado
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      onUpdate();
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col gap-2 w-full justify-center items-center bg-[#D9D9D9] p-5  ${
          edit ? 'rounded-t-lg' : 'rounded-lg'
        }`}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <div className="flex justify-between w-full cursor-pointer text-black">
          <div className="flex">
            <img
              src={`/transactionIcons/${category}.svg`}
              alt=""
              className="w-10 mr-5"
            />
            <div>
              <p className="font-bold text-2xl">{title}</p>
              <p className="flex items-center gap-2">{category}</p>
            </div>
          </div>
          <div className={`flex flex-col items-end`}>
            <p
              className={`font-bold text-2xl ${
                type === 'expense' ? 'text-redSpend' : 'text-greenIn'
              }`}
            >
              {type === 'income' ? '+ ' : '- '}
              {amount}
            </p>
            <p className="font-light">{description}</p>
          </div>
        </div>
      </div>

      {edit ? (
        <form
          className="w-full flex flex-col gap-2 h-full p-5 bg-[#323232] rounded-b-lg"
          onSubmit={handleUpdate}
        >
          <input
            type="text"
            name="title"
            value={transactionData.title}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <textarea
            name="description"
            value={transactionData.description}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <button type="submit" className="bg-green-500 rounded-md py-1 w-full">
            Guardar
          </button>

          <button
            type="button"
            className="bg-redSpend rounded-md py-1 w-full"
            onClick={handleDelete}
          >
            Eliminar gasto
          </button>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};
