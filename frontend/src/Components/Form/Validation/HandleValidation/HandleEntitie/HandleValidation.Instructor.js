import Swal from "sweetalert2";
import {
  onSubmitInstructor,
  updateInstructor,
} from "../../../../Services/FetchServices";
import toast from "react-hot-toast";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationInstructor({
  reset,
  perfiles,
  closeModal,
  usuarioSeleccionado,
  capturedImage,
}) {
  const onSubmit = async (data) => {
    toast.dismiss();

    const perfilSeleccionado = perfiles.find((p) => p.id === data.tipoPerfil);

    if (!perfilSeleccionado) {
      toast.error("No se encontró el perfil seleccionado");
      return;
    }

    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      telefono: data.telefono,
      tipoSangre: data.tipoSangre,
      tipoPerfil: perfilSeleccionado, // 👈 se envía el objeto completo
      foto: capturedImage || null,
    };

    try {
      if (usuarioSeleccionado?.id) {
        await updateInstructor(usuarioSeleccionado.id, payload);
        Swal.fire({
          icon: "success",
          title: "Instructor actualizado",
          text: "El instructor fue actualizado exitosamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "swal-confirm-green",
          },
        });
      } else {
        await onSubmitInstructor(payload);
        Swal.fire({
          icon: "success",
          title: "Instructor creado",
          text: "El instructor fue guardado exitosamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "swal-confirm-green",
          },
        });
      }

      reset();
      closeModal();
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar el instructor");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
  };

  return { onSubmit, onError };
}
