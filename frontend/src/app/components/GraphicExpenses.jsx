'use client'; // Aseguramos que este componente se ejecute solo en el cliente, ya que estamos trabajando con una librería que depende del DOM.

import React from 'react'; // Importamos React para crear el componente.
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Importamos los componentes necesarios de la librería 'recharts' para crear el gráfico de torta.

const data = [
  { name: 'Food', value: 400 }, // Definimos los datos que vamos a representar en el gráfico (en este caso, las categorías de gastos).
  { name: 'Rent', value: 300 },
  { name: 'Transport', value: 300 },
  { name: 'Others', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Definimos los colores que se asignarán a cada sección del gráfico (torta).

export default function GraphicExpenses() {
  return (
    <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold">Spending Distribution</h1>

      {/* Componente de gráfico de torta (PieChart) */}
      <PieChart
        width={400}
        height={400}
        className="bg-background rounded-lg shadow-custom"
      >
        <Pie
          data={data} // Pasamos los datos que definimos previamente.
          cx="50%" // Definimos la posición del centro del gráfico en el eje X (horizontal). El valor "50%" significa que el centro estará al 50% del ancho del gráfico.
          cy="50%" // Lo mismo para el eje Y (vertical). El centro estará al 50% de la altura del gráfico.
          outerRadius={100} // Definimos el radio exterior de la torta.
          fill="#8884d8" // Establecemos un color por defecto para el gráfico (aunque las celdas cambiarán el color).
          dataKey="value" // Indicamos que la clave de los datos a representar es "value" (los valores numéricos de cada categoría).
        >
          {/* Usamos el componente Cell para aplicar los colores a cada sección del gráfico */}
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} /> // Asignamos un color a cada sector de la torta usando el array de colores.
          ))}
        </Pie>
        {/* Tooltip que aparece al pasar el mouse sobre cada sección */}
        <Tooltip />
      </PieChart>
      {/* Lista que muestra la distribución de los gastos con sus porcentajes */}
      <ul className="grid grid-cols-2 gap-2 justify-between items-center w-full">
        {data.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center black-buttons"
          >
            <p>{entry.name}</p>
            <p>
              {(
                (entry.value /
                  data.reduce((acc, curr) => acc + curr.value, 0)) *
                100
              ).toFixed(2)}
              %
            </p>
          </li>
        ))}
      </ul>
      {/* Botón de acción o enlace (por ahora solo es un texto estilizado) */}
      <p className="black-buttons w-full shadow-custom">Analyze</p>
    </div>
  );
}
