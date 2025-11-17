import {
  onSubmitAprendiz,
  updateAdministrativo,
} from "../../../../Services/FetchServices";
import Swal from "sweetalert2";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationAprendiz({
  reset,
  perfiles,
  closeModal,
  perfil: nombrePerfil,
  capturedImage,
  usuarioSeleccionado,
}) {
  const onSubmit = async (data) => {
    const perfilSeleccionado = perfiles.find(
      (p) => p.nombre?.toLowerCase() === nombrePerfil?.toLowerCase()
    );

    if (!perfilSeleccionado || !data.ficha_id?.id) {
      Swal.fire({
        icon: "warning",
        title: "Ficha requerida",
        text: "Debes seleccionar una ficha de formación",
        confirmButtonText: "Aceptar",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
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
      idficha: data.ficha_id.id,
      foto: capturedImage || null,
    };

    try {
      if (usuarioSeleccionado?.id) {
        await updateAdministrativo(usuarioSeleccionado.id, payload); // ✅ id separado
        Swal.fire({
          icon: "success",
          title: "Aprendiz actualizado",
          text: `El aprendiz ${data.nombre} ${data.apellido} fue actualizado exitosamente`,
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
      } else {
        await onSubmitAprendiz(payload);
        Swal.fire({
          icon: "success",
          title: "Aprendiz creado",
          text: `El aprendiz ${data.nombre} ${data.apellido} fue creado exitosamente`,
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
      }

      closeModal();
      reset();
    } catch (error) {
      console.error("Error en envío:", error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "No se pudo guardar el aprendiz",
        confirmButtonText: "Aceptar",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    Swal.fire({
      icon: "warning",
      title: "Campos obligatorios",
      text: "Revisa los campos requeridos antes de continuar",
      confirmButtonText: "Aceptar",
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: true,
      customClass: {
        confirmButton: "buttonConfirmSwal",
      },
    });
  };

  return { onSubmit, onError, closeModal };
}
