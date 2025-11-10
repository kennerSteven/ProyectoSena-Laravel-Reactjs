import { useEffect, useState } from "react";

export default function useTipoPerfilFetch(nombreFiltro = "") {
  const [perfiles, setPerfiles] = useState([]);

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
        console.log("perfiles", data);
        const perfilesFiltrados = nombreFiltro
          ? perfilesArray.filter((p) =>
              p.nombre?.toLowerCase().includes(nombreFiltro.toLowerCase())
            )
          : perfilesArray;

        setPerfiles(perfilesFiltrados);
      } catch (err) {
        console.error("Error al obtener perfiles:", err);
        setPerfiles([]);
      }
    }

    fetchTipoPerfil();
  }, [nombreFiltro]);

  return {
    perfiles,
    perfil: perfiles.length > 0 ? perfiles[0] : null,
  };
}
