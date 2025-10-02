import toast from "react-hot-toast";

export default function useHandleValidationRegister({ reset, setVisible }) {
  const onSubmit = async () => {
    try {
      const loadingToast = toast.loading("Validando datos...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.dismiss(loadingToast);
      toast.success("Vehículo registrado exitosamente");

      reset();

      setVisible(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Error interno del servidor");
      console.error(error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos vacíos");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
