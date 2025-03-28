import React, { useState, useEffect } from 'react';

export const Spend = ({
  title,
  amount,
  category,
  description,
  symbol,
  date,
  token,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [spendData, setSpendData] = useState({
    title,
    amount,
    category,
    description,
  });

  // 🛠️ Cuando isEditing se activa, restablece los valores con los actuales
  useEffect(() => {
    if (isEditing) {
      setSpendData({ title, amount, category, description });
    }
  }, [isEditing, title, amount, category, description]);

  const handleChange = (e) => {
    setSpendData({
      ...spendData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/spends/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token desde el estado
        },
        body: JSON.stringify(spendData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/spends/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token desde el estado
        },
        body: JSON.stringify(spendData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center bg-black/10 p-5 rounded-lg">
      <p className="font-bold">{date}</p>

      {isDeleting ? (
        <div className="w-full flex flex-col gap-2">
          <p className="text-red-500">
            ¿Estás seguro de que quieres eliminar este gasto?
          </p>
          <button
            className="bg-red-500 rounded-md py-1 w-full"
            onClick={() => handleDelete()}
          >
            Confirmar eliminación
          </button>
          <button
            className="bg-gray-500 rounded-md py-1 w-full"
            onClick={() => setIsDeleting(false)}
          >
            Cancelar
          </button>
        </div>
      ) : isEditing ? (
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={spendData.title}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <textarea
            name="description"
            value={spendData.description}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <input
            type="number"
            name="amount"
            value={spendData.amount}
            onChange={handleChange}
            className="p-2 border rounded text-black"
          />
          <button
            className="bg-green-500 rounded-md py-1 w-full"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button
            className="bg-redSpend rounded-md py-1 w-full"
            onClick={() => setIsEditing(false)}
          >
            No guardar
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-full">
            <div>
              <p className="font-bold">{title}</p>
              <p className="font-light">{description}</p>
            </div>
            <div className="flex flex-col items-end">
              <p>{amount}</p>
              <p className="flex items-center gap-2">
                <img src="/coffeCup.svg" alt="" />
                {category}
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full gap-2 flex-col md:flex-row">
            <button
              className="bg-yellow-500 rounded-md py-1 w-full"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 rounded-md py-1 w-full"
              onClick={() => setIsDeleting(true)}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};
