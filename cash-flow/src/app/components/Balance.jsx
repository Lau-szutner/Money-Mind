import React from 'react'

export const Balance = ({balance, saving, investing}) => {
  return (
    <section className='bg-gray-500 m-10 p-7 w-5/12 rounded-lg flex flex-col gap-5'>
        <ul>
            <li>{`Saldo: ${balance}`}</li>
            <li>{`Ahorro: ${saving}`}</li>
            <li>{`Invertido: ${investing}`}</li>
        </ul>
      <div className='flex justify-between'>
        <button className='py-1 px-10 bg-blue-400 rounded'>+</button>
        <button className='py-1 px-10 bg-red-400 rounded'>-</button>
      </div>
    </section>
  )
}
