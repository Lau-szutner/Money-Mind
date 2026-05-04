export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  // Usamos 'es-ES' para asegurar el orden día/mes/año
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
