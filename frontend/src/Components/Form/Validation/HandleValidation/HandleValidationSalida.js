import { useState } from "react";
import { getIdForCarnet } from "../../../Services/FetchServices";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function HandleValidationSalida({
  reset,
  setVisible,
  createSalida,
  onSuccess,
}) {
  const [usuarioSalida, setUsuarioSalida] = useState(null);

  const onSubmit = async (payload) => {
    try {
      if (!payload?.numeroDocumento || payload.numeroDocumento.length < 6) {
        toast.error("Documento inválido");
        return;
      }

      toast.dismiss();

      console.log("Payload enviado:", payload);

      const result = await createSalida(payload);
      toast.dismiss();

      if (!result || result.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${result.error}`,
          confirmButtonText: "Aceptar",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
        console.error("Error del servidor:", result);
        return;
      }

      const idUserCarnet = result?.salida?.idusuario;
      if (!idUserCarnet) {
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

      setUsuarioSalida({
        ...datosCarnet,
        foto: fotoUrl,
      });

      reset?.();
      setVisible?.(false);
      if (typeof onSuccess === "function") {
        onSuccess(datosCarnet);
      }
    } catch (error) {
      console.error("Error en onSubmit:", error);
      toast.dismiss();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar la salida.",
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

  return { onSubmit, onError, usuarioSalida };
}
