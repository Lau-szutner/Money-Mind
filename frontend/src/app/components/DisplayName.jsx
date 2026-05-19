'use client';

import React from 'react';
import { useAuthContext } from '@/context/AuthProvider'; // Asegúrate de que la ruta sea correcta

export default function DisplayName() {
  const { user, isChecking, status } = useAuthContext();

  if (isChecking) return <div>Cargando...</div>;

  if (!user) return <div>No hay datos disponibles o no estás autenticado</div>;

  return (
    <div className="grid gap-5 mt-5">
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}
