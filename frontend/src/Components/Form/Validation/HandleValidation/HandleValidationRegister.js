import { useState } from "react";

import { getIdForCarnet } from "../../../Services/FetchServices";

export default function useHandleValidationRegister({
  reset,
  setVisible,
  documentoEntrada,
}) {
  const [dataCarnet, setDataCarnet] = useState([]);

  const onSubmit = async (payload) => {
    try {
      const numeroDocumento = documentoEntrada || payload?.numeroDocumento;

      const response = await fetch(
        "http://127.0.0.1:8000/api/entradaysalidagym/entradagym",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ numeroDocumento }),
        }
      );

      const result = await response.json();
      const idUserCarnet = result.entrada?.idusuario;

      const datosCarnet = await getIdForCarnet(idUserCarnet);
      const fotoRuta = datosCarnet?.foto;
      const fotoUrl = fotoRuta ? `http://localhost:8000/${fotoRuta}` : null;

      setDataCarnet({
        ...datosCarnet,
        foto: fotoUrl,
      });

      reset?.();
      setVisible?.(false);
    } catch (error) {
      console.error("Error en onSubmit:", error);
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, dataCarnet };
}
