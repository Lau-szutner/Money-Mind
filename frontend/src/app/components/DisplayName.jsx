'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function DisplayName({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      setError('No estás autenticado.');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.id;

      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:4000/users/${userId}`);
          if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } catch (error) {
      setError('Error al decodificar el token');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>No hay datos disponibles</div>; // Evita el error de `null.name`

  return (
    <div className="p-2 border border-whiteText flex gap-5">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{id}</p>
    </div>
  );
}
