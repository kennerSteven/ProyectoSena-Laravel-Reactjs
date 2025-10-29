import { useEffect, useState } from "react";

export default function useTipoPerfilFetch(nombreFiltro = "") {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    async function fetchTipoPerfil() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/perfiles/index", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const perfilesArray = Array.isArray(data) ? data : Object.values(data);

        const perfilEncontrado = nombreFiltro
          ? perfilesArray.find(
              (p) => p.nombre?.toLowerCase() === nombreFiltro.toLowerCase()
            )
          : perfilesArray[0]; 

        setPerfil(perfilEncontrado || null); 
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        setPerfil(null);
      }
    }

    fetchTipoPerfil();
  }, [nombreFiltro]);

  return { perfil };
}