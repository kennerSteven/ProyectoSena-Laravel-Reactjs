import { onSubmitPerfil } from "../../../Services/FetchServices";
import Swal from "sweetalert2";
export default function usePerfilForm({ reset, closeModal }) {
  const onSubmit = async (data) => {
    try {
      const dataLaravel = {
        nombre: data.tipoPerfil,
        descripcion: data.descripcion,
      };

      console.log("Payload enviado a Laravel:");
      console.table(dataLaravel);

      await onSubmitPerfil(dataLaravel);

      closeModal();
      Swal.fire({
        icon: "success",
        title: "Perfil creado ",
        text: "El perfil fue creado exitosamente",
        confirmButtonText: "Aceptar",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
      reset();
    } catch (error) {
      console.error("Error en envío de perfil:", error);
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
