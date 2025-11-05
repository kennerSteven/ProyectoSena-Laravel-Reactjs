import { useState } from "react";
import toast from "react-hot-toast";
import { getIdForCarnet } from "../../../Services/FetchServices";

export default function useHandleValidationRegister({ reset, setVisible }) {
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
      const idUserCarnet = result.entrada.idusuario;

      const datosCarnet = await getIdForCarnet(idUserCarnet);

      const fotoRuta = datosCarnet?.foto;
      const fotoUrl = fotoRuta ? `http://localhost:8000/${fotoRuta}` : null;

      setDataCarnet({
        ...datosCarnet,
        foto: fotoUrl,
      });

      reset();
      setVisible(false);
    } catch (error) {
      console.error("Error en onSubmit:", error);
      toast.error("Error inesperado al registrar entrada");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, dataCarnet };
}
