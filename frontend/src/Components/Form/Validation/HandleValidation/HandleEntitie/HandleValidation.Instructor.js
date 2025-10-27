import { useState } from "react";
import toast from "react-hot-toast";
import { onSubmitInstructor } from "../../../../Services/FetchServices";

export default function HandleValidationInstructor({ reset, perfiles,closeModal }) {
  const [formData, setFormData] = useState();

  const onSubmit = async (data) => {
    toast.dismiss();

    if (!Array.isArray(perfiles)) {
      toast.error("Perfiles no disponibles");
      console.warn("Perfiles es:", perfiles);
      return;
    }

    const perfilJuan = perfiles.find(
      (p) => p.nombre?.toLowerCase() === "juan"
    );

    if (!perfilJuan) {
      toast.error("No se encontró el perfil 'Juan'");
      return;
    }

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
      toast.success("Instructor creado exitosamente");
      reset();
      closeModal()
      setFormData(undefined);
    } catch (error) {
      toast.error("Error interno");
      console.error("Error en envío:", error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Error de validación");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, formData,closeModal };
}