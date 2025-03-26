'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Importa js-cookie

export default function DisplayName() {
  // Estado para almacenar los datos de la API
  const [user, setUser] = useState(null);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extraemos el token de las cookies
    const token = Cookies.get('authToken'); // Asegúrate de que el nombre de la cookie sea el correcto

    console.log(token);

    if (!token) {
      setError('No estás autenticado.');
      setLoading(false);
      return;
    }

    // Decodificar el token (suponiendo que es un JWT)
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el JWT y extrae la carga útil
    const userId = decodedToken.id; // Asegúrate de que el `id` esté en el payload del token

    const fetchData = async () => {
      try {
        setLoading(true); // Empieza la carga
        const response = await fetch(`http://localhost:4000/users/${userId}`); // URL con el `id` del usuario
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error
          throw new Error('Error al obtener los datos del usuario');
        }
        const data = await response.json(); // Convierte la respuesta a formato JSON
        setUser(data); // Guarda los datos del usuario en el estado
      } catch (error) {
        setError(error.message); // Captura cualquier error y guarda el mensaje
      } finally {
        setLoading(false); // Termina la carga, ya sea con éxito o error
      }
    };

    fetchData(); // Llama a la función para hacer la petición
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  return (
    <div className="p-2 border border-whiteText">
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
