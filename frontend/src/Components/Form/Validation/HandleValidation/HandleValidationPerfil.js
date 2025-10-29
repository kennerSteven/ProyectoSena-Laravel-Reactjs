import toast from "react-hot-toast";
import { onSubmitPerfil } from "../../../Services/FetchServices";

export default function usePerfilForm({ reset }) {
  const onSubmit = async (data) => {


    try {
      // Construcción defensiva del objeto
      const dataLaravel = {
        nombre: data.tipoPerfil,
        descripcion: data.descripcion,
      };

      console.log("Payload enviado a Laravel:");
      console.table(dataLaravel);

      await onSubmitPerfil(dataLaravel);

      reset();
    } catch (error) {
      toast.error("Error interno del servidor");
      console.error("Error en envío de perfil:", error);
    }
  };

  const onError = (errors) => {

    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
