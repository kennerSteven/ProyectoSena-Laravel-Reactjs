import { useEffect, useState } from "react";
import { getFichas } from "../Services/FetchServices";

export default function useFichaFetch() {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    async function fetchFichas() {
      try {
        const data = await getFichas();

        const opciones = data.map((ficha) => ({
          value: ficha.id,
          label: `${ficha.numeroFicha} - ${ficha.nombrePrograma} - ${ficha.jornada}`,
          icon:
            ficha.jornada === "mañana"
              ? "pi pi-sun"
              : ficha.jornada === "tarde"
              ? "pi pi-cloud"
              : ficha.jornada === "noche"
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
