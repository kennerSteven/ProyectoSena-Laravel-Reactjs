import { useState } from "react";
import Swal from "sweetalert2";
import { onSubmitAprendiz } from "../../../../Services/FetchServices";
import toast from "react-hot-toast";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationAprendiz({
  reset,
  perfiles,
  closeModal,
  perfil: nombrePerfil,
  capturedImage,
}) {
  const [formData, setFormData] = useState();
  const [docEntrada, setDocEntrada] = useState();
  const onSubmit = async (data) => {
    toast.dismiss();

    const perfilSeleccionado = perfiles.find(
      (p) => p.nombre?.toLowerCase() === nombrePerfil?.toLowerCase()
    );

    if (!perfilSeleccionado) {
      toast.error("No se encontró el perfil solicitado");
      return;
    }

    if (!data.ficha_id) {
      toast.error("Debes seleccionar una ficha de formación");
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
      idficha: data.ficha_id,
      foto: capturedImage || null,
    };

    const numeroDocEntrada = payload.numeroDocumento;
    setDocEntrada(numeroDocEntrada);

    console.table("Aprendiz data", payload);
    setFormData(payload);

    try {
      await onSubmitAprendiz(payload);
      closeModal();
      await Swal.fire({
        icon: "success",
        title: "Aprendiz creado",
        text: "El aprendiz fue guardado exitosamente",
        confirmButtonText: "Aceptar",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "swal-confirm-green",
        },
      });

      reset();
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar el aprendiz");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
  };

  return { onSubmit, onError, formData, closeModal, docEntrada };
}
