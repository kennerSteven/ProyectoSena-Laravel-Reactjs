// Archivo: ./Validation/HandleValidation/HandleValidation.Ficha.jsx
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { onSubmitFicha, updateFicha } from "../../../Services/FetchServices";
import "../../../../styles/ButtonSubmit.css";

export default function HandleValidationFicha({
  reset,
  // 💡 Se mantiene este nombre porque es el que se le pasa desde CrearFicha
  closeModalAndRefresh,
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
        // --- Lógica de ACTUALIZACIÓN ---
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

        // 💡 CIERRA MODAL Y REFRESCÓ LA TABLA
        if (closeModalAndRefresh) closeModalAndRefresh();
      } else {
        // --- Lógica de CREACIÓN ---
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

        // 💡 CIERRA MODAL Y REFRESCÓ LA TABLA
        if (closeModalAndRefresh) closeModalAndRefresh();
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
