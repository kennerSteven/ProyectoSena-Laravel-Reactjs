import toast from "react-hot-toast";

export default function useHandleValidationFormPerfil(reset) {
  const onSubmit = async () => {
    toast.loading("Validando datos...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.dismiss();
    toast.success(`Perfil registrado`);
    reset();
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos marcados");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
