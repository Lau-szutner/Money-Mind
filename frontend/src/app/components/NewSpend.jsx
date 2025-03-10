import React from 'react';

function NewIncome() {
  return (
    <div>
      <div className="">
        <div className="bg-gray-500 p-5 rounded-lg m-5">
          <h1 className="font-bold text-center">Agregar Ingreso</h1>
          <div className="gap-2 mt-2">
            <form action="" className="flex flex-col gap-2">
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500"
                placeholder="Categoria"
                name="category"
              />
              <input
                type="number"
                className="p-1 rounded w-full text-gray-500"
                placeholder="Monto"
                name="amount"
              />
              <button className="py-1 px-10 bg-green-400 rounded w-full">
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewIncome;
