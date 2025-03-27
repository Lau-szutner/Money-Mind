import React, { useState } from 'react';

function Newspend() {
  const [spendData, setSpendData] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    amount: '',
  });

  const handleChandeData = (event) => {
    const { name, value } = event.target; // Desestructuramos el name y el value del input

    setSpendData((prevData) => ({
      ...prevData,
      [name]: value, // Actualizamos solo el campo que ha cambiado
    }));
  };

  return (
    <div>
      <div className="font-regular">
        <div className="bg-bgComponents p-5 rounded-lg m-5">
          <h1 className="font-bold text-center">New income</h1>

          <div className="gap-2 mt-2">
            <form action="" className="flex flex-col gap-2">
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Title"
                name="title"
                value={spendData.title}
                onChange={handleChandeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Description"
                name="description"
                value={spendData.description}
                onChange={handleChandeData}
              />
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Category"
                name="category"
                value={spendData.category}
                onChange={handleChandeData}
              />
              <input
                type="number"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Amount"
                name="amount"
                value={spendData.amount}
                onChange={handleChandeData}
              />

              <button className="py-1 px-10 bg-greenIn rounded w-full text-white font-semibold shadow-custom">
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
