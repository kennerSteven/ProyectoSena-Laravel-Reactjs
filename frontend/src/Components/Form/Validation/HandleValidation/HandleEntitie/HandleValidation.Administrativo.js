import Swal from "sweetalert2";
import {
  onSubmitAdministrativo,
  updateAdministrativo,
} from "../../../../Services/FetchServices";
import toast from "react-hot-toast";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationAdministrativo({
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
      idperfil: perfilSeleccionado.id,
      foto: capturedImage || null,
    };

    try {
      if (usuarioSeleccionado?.id) {
        await updateAdministrativo(usuarioSeleccionado.id, payload);
        Swal.fire({
          icon: "success",
          title: "Administrativo actualizado",
          text: "El administrativo fue actualizado exitosamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
      } else {
        await onSubmitAdministrativo(payload);
        Swal.fire({
          icon: "success",
          title: "Administrativo creado",
          text: "El administrativo fue guardado exitosamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
      }

      reset();
      closeModal();
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar el administrativo");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
  };

  return { onSubmit, onError };
}
