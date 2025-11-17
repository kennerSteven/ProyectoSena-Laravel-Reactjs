import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { onSubmitFicha, updateFicha } from "../../../Services/FetchServices";
import "../../../../styles/ButtonSubmit.css";

export default function HandleValidationFicha({
  reset,
  closeModal,
  fichaSeleccionada,
}) {
  const onSubmit = async (data) => {
    toast.dismiss();

    const payload = {
      numeroFicha: data.numeroFicha,
      nombrePrograma: data.nombreFormacion,
      jornada: data.jornada,
      estado: "activo",
    };

    console.log(payload);

    try {
      if (fichaSeleccionada?.id) {
        await updateFicha(fichaSeleccionada.id, payload);

        Swal.fire({
          icon: "success",
          title: "Ficha actualizada ",
          text: "La ficha fue actualizada correctamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "buttonConfirmSwal",
          },
        });
        closeModal();
      } else {
        await onSubmitFicha(payload);

        Swal.fire({
          icon: "success",
          title: "Ficha creada ",
          text: "La ficha fue creada exitosamente",
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
    } catch (error) {
      console.error("Error en envío:", error);
      toast.error("Error al guardar la ficha");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
    toast.dismiss();
  };

  return { onSubmit, onError };
}
