import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Newspend() {
  const [incomeData, setIncomeData] = useState({
    user_id: '', // Inicializar con un valor vacío para el id
    title: '',
    description: '',
    category: '',
    photo: '',
    date: '',
    type: 'income',
    amount: '',
  });
  const token = Cookies.get('authToken'); // Obtener el token desde las cookies

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setIncomeData((prevData) => ({
      ...prevData,
      [name]: value, // Actualiza solo el campo que ha cambiado
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token desde el estado
        },
        body: JSON.stringify(incomeData),
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
    <div>
      <div className="font-regular">
        <div className="bg-bgComponents p-5 rounded-lg m-5">
          <h1 className="font-bold text-center">New income</h1>

          <div className="gap-2 mt-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Title"
                name="title"
                value={incomeData.title}
                onChange={handleChangeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Description"
                name="description"
                value={incomeData.description}
                onChange={handleChangeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Category"
                name="category"
                value={incomeData.category}
                onChange={handleChangeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="photo"
                name="photo"
                value={incomeData.photo}
                onChange={handleChangeData}
              />
              <input
                type="date"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="date"
                name="date"
                value={incomeData.date}
                onChange={handleChangeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="type"
                name="type"
                value={incomeData.type}
                onChange={handleChangeData}
              />
              <input
                type="number"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Amount"
                name="amount"
                value={incomeData.amount}
                onChange={handleChangeData}
              />
              <button
                type="submit"
                className="py-1 px-10 bg-greenIn rounded w-full text-white font-semibold shadow-custom"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newspend;
