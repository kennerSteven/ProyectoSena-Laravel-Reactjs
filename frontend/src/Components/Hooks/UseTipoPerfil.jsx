import { useEffect } from "react";

export default function useTipoPerfilFetch(setValue, perfil) {
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

        const data = await res.json();
        const encontrado = data.find((item) => item.nombre === perfil);
        console.log(data)
        if (encontrado) {
          setValue("tipoPerfil", perfil);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchTipoPerfil();
  }, [setValue, perfil]);
}
