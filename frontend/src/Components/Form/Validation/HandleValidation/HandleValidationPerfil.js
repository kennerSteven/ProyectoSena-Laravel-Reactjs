import toast from "react-hot-toast";
import { onSubmitPerfil } from "../../../Services/FetchServices";
export default function usePerfilForm({ reset }) {
  const onSubmit = async (data) => {
    try {
      const dataLaravel = {
        descripcion: data.caracteristica,
        nombre: data.tipoPerfil,
      };

      const loadingToast = toast.loading("Validando datos...");
      await new Promise((e) => setTimeout(e, 600));
      await onSubmitPerfil(dataLaravel);
      toast.dismiss(loadingToast);
      toast.success("Perfil registrado exitosamente");
      reset();
    } catch (error) {
      toast.error("Error interno del servidor");
      console.error(error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos vacios");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
