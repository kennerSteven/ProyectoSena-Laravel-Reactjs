import Swal from "sweetalert2";
import { onSubmitVisitante } from "../../../Services/FetchServices";
import toast from "react-hot-toast";
import "../../../../styles/ButtonSubmit.css";

export default function HandleValidationVisitante({
  reset,
  perfiles,
  closeModal = () => {},
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
      nombre: data.nombre?.trim(),
      apellido: data.apellido?.trim(),
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento?.trim(),
      telefono: data.telefono?.trim(),
      idperfil: perfilSeleccionado.id,
      foto: capturedImage || null,
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await onSubmitVisitante(payload);
      console.log("Respuesta del backend:", response);

      closeModal(); // Cierra el modal primero

      await Swal.fire({
        icon: "success",
        title: "Visitante creado",
        text: `El visitante ${data.nombre} ${data.apellido} fue creado exitosamente`,
        confirmButtonText: "Aceptar",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });

      reset?.(); // Limpia el formulario después del Swal
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar el visitante");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
    toast.error("Por favor completa los campos requeridos");
  };

  return { onSubmit, onError, closeModal };
}
