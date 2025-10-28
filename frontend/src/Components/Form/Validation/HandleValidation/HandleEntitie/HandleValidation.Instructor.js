import { useState } from "react";
import Swal from "sweetalert2";
import { onSubmitInstructor } from "../../../../Services/FetchServices";
import toast from "react-hot-toast";

export default function HandleValidationInstructor({
  reset,
  perfiles,
  closeModal,
}) {
  const [formData, setFormData] = useState();

  const onSubmit = async (data) => {
    toast.dismiss();
    const perfilJuan = perfiles.find((p) => p.nombre?.toLowerCase() === "juan");

    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      telefono: data.telefono,
      tipoSangre: data.tipoSangre,
      idperfil: perfilJuan.id,
    };

    console.table(payload);
    setFormData(payload);

    try {
      await onSubmitInstructor(payload);
      reset();
      closeModal();

      // ✅ Espera 300ms para que el modal se cierre antes de mostrar SweetAlert

      Swal.fire({
        icon: "success",
        title: "Instructor creado",
        text: "El instructor fue guardado exitosamente",
        confirmButtonText: "Aceptar",
      });

      setFormData(payload);
    } catch (error) {
      console.error("Error en envío:", error);
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
    toast.error("Errores de validacion");
  };

  return { onSubmit, onError, formData, closeModal };
}
