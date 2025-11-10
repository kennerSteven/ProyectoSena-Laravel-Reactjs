import { useState } from "react";
import toast from "react-hot-toast";
import { getIdForCarnet } from "../../../Services/FetchServices";

export default function useHandleValidationRegister({ reset, setVisible, documentoEntrada }) {
  const [dataCarnet, setDataCarnet] = useState([]);

  const onSubmit = async (payload) => {
    try {
      const loadingToast = toast.loading("Validando...");

      // ✅ Determinar documento desde argumento o payload
      const numeroDocumento = documentoEntrada || payload?.numeroDocumento;

      if (!numeroDocumento) {
        toast.dismiss(loadingToast);
        toast.error("No se proporcionó número de documento");
        console.warn("Número de documento faltante en payload o argumento");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/entradaysalidagym/entradagym", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ numeroDocumento }), // ✅ solo se envía el documento
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        const errorText = await response.text();
        toast.error("Error al registrar entrada");
        console.error("Error del servidor:", errorText);
        return;
      }

      const result = await response.json();
      const idUserCarnet = result.entrada?.idusuario;

      if (!idUserCarnet) {
        toast.error("No se pudo obtener el ID del usuario");
        console.warn("Respuesta sin idusuario:", result);
        return;
      }

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
      toast.error("Error inesperado al registrar entrada");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, dataCarnet };
}