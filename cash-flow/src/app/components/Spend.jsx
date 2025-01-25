import React from 'react';

export const Spend = ({
  title,
  price,
  category,
  description,
  symbol,
  date,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center bg-black/10 p-5 rounded-lg">
      <p className="font-bold">{date}</p>
      <div className="flex justify-between w-full">
        <div>
          <p className="font-bold">{title}</p>
          <p className="font-light">{description}</p>
        </div>

        <div className="flex flex-col items-end">
          <p>{price}</p>
          <p className="flex items-center gap-2">
            <img src="/coffeCup.svg" alt="" />
            {category}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full gap-2">
        <button className="bg-yellow-500 rounded-md py-1 w-full ">
          Editar
        </button>
        <button className="bg-red-500 rounded-md py-1 w-full">Eliminar</button>
      </div>
    </div>
  );
};
