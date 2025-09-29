import toast from "react-hot-toast";

export default function useHandleValidationUser(reset) {
  const onSubmit = async (data) => {
    toast.loading("Validando datos...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.dismiss();
    toast.success(`Gracias ${data.nombre} por enviar los datos`);
    reset();
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos marcados");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
