import { useState } from "react";
import Swal from "sweetalert2";
import { onSubmitInstructor } from "../../../../Services/FetchServices";
import toast from "react-hot-toast";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationAprendiz({
  reset,
  perfiles,
  closeModal,
  perfil: nombrePerfil, // ✅ renombrado para evitar conflicto
}) {
  const [formData, setFormData] = useState();

  const onSubmit = async (data) => {
    toast.dismiss();

    const perfilSeleccionado = perfiles.find(
      (p) => p.nombre?.toLowerCase() === nombrePerfil?.toLowerCase()
    );

    if (!perfilSeleccionado) {
      toast.error("No se encontró el perfil solicitado");
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
    };

    console.table(payload);
    setFormData(payload);

    try {
      await onSubmitInstructor(payload);
      reset();
      closeModal();

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
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar el instructor");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
  };

  return { onSubmit, onError, formData, closeModal };
}
