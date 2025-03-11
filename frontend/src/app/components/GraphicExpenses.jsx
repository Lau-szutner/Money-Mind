'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';

export default function GraphicExpenses() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Crear el gráfico dentro del contenedor
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { backgroundColor: '#ffffff', textColor: '#333' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
    });

    const lineSeries = chart.addSeries(LineSeries, { color: 'red' });

    // Datos de ejemplo (Gastos mensuales)
    const data = [
      { time: '2024-01-01', value: 500 }, // Enero
      { time: '2024-02-01', value: 700 }, // Febrero
      { time: '2024-03-01', value: 650 }, // Marzo
      { time: '2024-04-01', value: 800 }, // Abril
    ];

    lineSeries.setData(data);
    chart.timeScale().fitContent();

    // Limpieza al desmontar el componente
    return () => chart.remove();
  }, []);

  return (
    <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold">Spends</h1>
      <div ref={chartContainerRef} className="w-full h-[300px]" />
      <ul className="grid grid-cols-2 gap-2 justify-between items-center w-full">
        <li className="black-buttons shadow-custom w-full">Food: 40%</li>
        <li className="black-buttons shadow-custom w-full">Rent: 25%</li>
        <li className="black-buttons shadow-custom w-full">Transport: 20%</li>
        <li className="black-buttons shadow-custom w-full">Others: 15%</li>
      </ul>
      <p className="black-buttons w-full shadow-custom">Analyze</p>
    </div>
  );
}
