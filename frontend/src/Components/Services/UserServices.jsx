// src/components/Usuarios.jsx
import { useEffect, useState } from 'react';

export default function UsuarioService() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/perfiles', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Perfiles desde Laravel:', data.perfiles); // 👈 Aquí se imprime en consola
        setUsuarios(data.perfiles); // 👈 Aquí se guarda en estado
      } catch (error) {
        console.error('Error al obtener perfiles:', error);
      }
    }

    cargarUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Perfiles</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}