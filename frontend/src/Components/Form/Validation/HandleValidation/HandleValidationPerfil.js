import toast from "react-hot-toast";
import { onSubmitPerfil } from "../../../Services/FetchServices";
export default function usePerfilForm({ reset }) {
  const onSubmit = async (data) => {
    try {
      const dataLaravel = {
        descripcion: data.caracteristica,
        nombre: data.tipoPerfil,
      };

      toast.loading("Validando datos...");

      await onSubmitPerfil(dataLaravel);
      toast.dismiss();
      toast.success("Perfil registrado exitosamente");
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("Error interno del servidor");
      console.error(error);
    }
  };

  const onError = () => {
    toast.dismiss();
    toast.error("Por favor revisa los campos vacios");
  };

  return { onSubmit, onError };
}
