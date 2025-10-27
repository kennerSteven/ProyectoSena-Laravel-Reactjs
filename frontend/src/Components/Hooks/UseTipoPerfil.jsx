import { useEffect, useState } from "react";

export default function useTipoPerfilFetch() {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        if (!res.ok) throw new Error("Respuesta no válida del servidor");

        const data = await res.json();
        const perfilesArray = Array.isArray(data) ? data : Object.values(data);

        // Filtra solo el perfil con nombre "Juan"
        const perfilJuan = perfilesArray.filter(
          (p) => p.nombre?.toLowerCase() === "juan"
        );

        setPerfiles(perfilJuan); // ✅ solo se guarda el perfil "Juan"
      } catch (err) {
        console.error("Error al obtener perfiles:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTipoPerfil();
  }, []);

  return { perfiles, loading, error };
}