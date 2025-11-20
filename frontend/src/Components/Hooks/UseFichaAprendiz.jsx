import { useEffect, useState } from "react";
import { getFichas } from "../Services/FetchServices";

export default function useFichaFetch() {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    async function fetchFichas() {
      try {
        const data = await getFichas();

        const opciones = data.map((ficha) => ({
          ...ficha,
          label: `${ficha.numeroFicha} - ${ficha.nombrePrograma} - ${ficha.jornada}`,
          icon:
            ficha.jornada?.toLowerCase() === "mañana"
              ? "pi pi-sun"
              : ficha.jornada?.toLowerCase() === "tarde"
              ? "pi pi-cloud"
              : ficha.jornada?.toLowerCase() === "noche"
              ? "pi pi-moon"
              : "pi pi-question",
        }));

        setFichas(opciones);
      } catch (error) {
        console.error("Error al cargar fichas:", error);
        setFichas([]);
      }
    }

    fetchFichas();
  }, []);

  return { fichas };
}
