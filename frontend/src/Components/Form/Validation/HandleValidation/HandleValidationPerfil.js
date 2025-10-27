import toast from "react-hot-toast";
import { onSubmitPerfil } from "../../../Services/FetchServices";

export default function usePerfilForm({ reset }) {
  const onSubmit = async (data) => {
    toast.dismiss();
    toast.loading("Validando datos...");

    try {
      // Construcción defensiva del objeto
  const dataLaravel = {
  nombre: data.tipoPerfil,
  descripcion: data.descripcion,
};

      // Validación institucional
      if (!dataLaravel.nombre || !dataLaravel.descripcion) {
        toast.dismiss();
        toast.error("Todos los campos son obligatorios.");
        console.warn("Campos faltantes en dataLaravel:", dataLaravel);
        return;
      }

      console.log("Payload enviado a Laravel:");
      console.table(dataLaravel);

      await onSubmitPerfil(dataLaravel);

      toast.dismiss();
      toast.success("Perfil registrado exitosamente");
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("Error interno del servidor");
      console.error("Error en envío de perfil:", error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos vacíos");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}