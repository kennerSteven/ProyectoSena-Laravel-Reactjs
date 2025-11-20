import { useState } from "react";
import { getIdForCarnet } from "../../../Services/FetchServices";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function useHandleValidationRegister({
  reset,
  setVisible,
  createRegister,
}) {
  const [dataCarnet, setDataCarnet] = useState(null);

  const onSubmit = async (payload) => {
    try {
      const result = await createRegister(payload);

      if (!result || result.error) {
        console.error("Error en respuesta del backend:", result);
        throw new Error(result.message || "Error al registrar entrada");
      }

      const idUserCarnet = result?.entrada?.idusuario;
      if (!idUserCarnet) {
        toast.dismiss();
        Swal.fire({
          icon: "error",
          title: "Usuario no registrado",
          text: "No se encontró el ID del usuario en la respuesta.",
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
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
      toast.dismiss();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar la entrada.",
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.error("Completa los campos requeridos");
  };

  return { onSubmit, onError, dataCarnet };
}
