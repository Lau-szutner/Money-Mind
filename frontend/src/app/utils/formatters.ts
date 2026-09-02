export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  // Usamos 'es-ES' para asegurar el orden día/mes/año
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatShortDate = (date: string | Date) => {
  const d = new Date(date);

  return d.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

export const formatNumber = (value: number | string | null | undefined) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) return '0';

  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(numberValue);
};
