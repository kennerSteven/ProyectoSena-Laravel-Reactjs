import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { onSubmitFicha, updateFicha } from "../../../Services/FetchServices";
import "../../../../styles/ButtonSubmit.css";

export default function HandleValidationFicha({
  reset,

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
          title: "Ficha actualizada",
          text: "La ficha fue actualizada exitosamente",
          confirmButtonText: "Aceptar",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          customClass: {
            confirmButton: "swal-confirm-green",
          },
        });
      } else {
        await onSubmitFicha(payload);

        toast.success("Ficha creada exitosamente!");
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
