import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='h-20 bg-gray-500 flex justify-between items-center p-5'>
        <h1>HELLO</h1>
        
        <ul className='flex flex-col lg:flex-row gap-10'>
            <li>
                <Link href="/Gastos">Gastos</Link>
            </li>
            <li>analisis</li>
            <li>planes</li>
            <li>educacion</li>
        </ul>
    </div>
  )
}
