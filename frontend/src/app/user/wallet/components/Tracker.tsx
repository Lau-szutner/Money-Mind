import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatNumber } from '@/app/utils/formatters';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: string;
  title: string;
  category?: string;
  date?: string;
  [key: string]: any;
};

type TrackerProps = {
  transactions: Transaction[];
};

const categoryColors: Record<string, string> = {
  Supermercado: '#10B981',
  Entretenimiento: '#3B82F6',
  Salud: '#EC4899',
  Libros: '#F59E0B',
  Deportes: '#14B8A6',
  Tecnología: '#06B6D4',
  Impuestos: '#EF4444',
  Comida: '#F97316',
  Transporte: '#8B5CF6',
  Vivienda: '#A855F7',
  Servicios: '#22C55E',
  'Sin categoría': '#94A3B8',
};

const normalizeDateKey = (value?: string) => {
  if (!value) return '';

  const trimmed = value.trim();
  const datePart = trimmed.includes('T')
    ? trimmed.split('T')[0]
    : trimmed.split(' ')[0];

  if (!datePart) return '';

  const [year, month, day] = datePart.split('-');
  if (!year || !month || !day) return '';

  return `${year}-${month}-${day}`;
};

const getCategoryName = (value?: string) => value?.trim() || 'Sin categoría';

const TrackerTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  const visibleItems = payload.filter((item: any) => Number(item.value) > 0);

  if (!visibleItems.length) return null;

  return (
    <div className="rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900 shadow-lg">
      <p className="mb-1 font-medium">{label}</p>
      {visibleItems.map((item: any) => (
        <p key={item.dataKey} style={{ color: item.color }}>
          {item.name}: ${formatNumber(item.value)}
        </p>
      ))}
    </div>
  );
};

export const Tracker = ({ transactions }: TrackerProps) => {
  const chartData = React.useMemo(() => {
    const expenseTransactions = transactions.filter(
      (item) => item.type === 'expense',
    );

    if (!expenseTransactions.length) {
      return [] as Record<string, string | number>[];
    }

    const allCategories = [
      ...new Set(
        expenseTransactions.map((item) => getCategoryName(item.category)),
      ),
    ];

    const allDates = [
      ...new Set(
        expenseTransactions
          .map((item) => normalizeDateKey(item.date))
          .filter(Boolean),
      ),
    ].sort();

    const rows = allDates.map((date) => {
      const row: Record<string, string | number> = { date };

      allCategories.forEach((category) => {
        const total = expenseTransactions
          .filter(
            (item) =>
              normalizeDateKey(item.date) === date &&
              getCategoryName(item.category) === category,
          )
          .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        row[category] = total;
      });

      return row;
    });

    return rows;
  }, [transactions]);

  const categories = React.useMemo(() => {
    const allCategories = new Set<string>();

    chartData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'date') allCategories.add(key);
      });
    });

    return [...allCategories];
  }, [chartData]);

  return (
    <div className="relative z-10 bg-bgComponents rounded-lg text-2xl w-full flex flex-col p-5 h-fit">
      <div className="border-b flex justify-between items-center pb-3 mb-4">
        <h3 className="font-bold text-3xl">Tracker</h3>
      </div>

      {chartData.length === 0 ? (
        <div className="grid place-items-center h-[250px] text-lg text-gray-400">
          No hay gastos para mostrar en este mes.
        </div>
      ) : (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#E5E7EB' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#E5E7EB' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<TrackerTooltip />}
                wrapperStyle={{ zIndex: 50 }}
              />
              <Legend />
              {categories.map((category) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={category}
                  stroke={categoryColors[category] || '#A78BFA'}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
