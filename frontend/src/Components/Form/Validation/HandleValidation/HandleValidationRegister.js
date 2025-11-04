import { useState } from "react";
import toast from "react-hot-toast";
import { getIdForCarnet } from "../../../Services/FetchServices";
export default function useHandleValidationRegister({ reset, setVisible }) {
  const [entradaData, setDataEntrada] = useState([]);
  const [dataCarnet, setDataCarnet] = useState([]);

  const onSubmit = async (payload) => {
    try {
      const loadingToast = toast.loading("Validando...");

      const response = await fetch(
        "http://127.0.0.1:8000/api/entradaysalidagym/entradagym",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      toast.dismiss(loadingToast);

      if (!response.ok) {
        const errorText = await response.text();
        toast.error("Error al registrar entrada");
        console.error("Error del servidor:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);
      setDataEntrada(result);

      const idUserCarnet = result.entrada.idusuario;
      console.log("id to find user", idUserCarnet);

      const datosCarnet = await getIdForCarnet(idUserCarnet);
      setDataCarnet(datosCarnet);

      reset();
      setVisible(false);
    } catch (error) {
      console.error("Error en onSubmit:", error);
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, entradaData, dataCarnet };
}
