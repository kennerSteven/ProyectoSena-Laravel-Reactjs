import toast from "react-hot-toast";

export default function useHandleValidationRegister({ reset, closeModal }) {
  const onSubmit = async (data) => {
    try {
      const loadingToast = toast.loading("Validando datos...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.dismiss(loadingToast);
      toast.success("Vehículo registrado exitosamente");

      // 🔹 reset viene del useForm del formulario hijo
      if (typeof reset === "function") {
        reset();
      }

      // 🔹 closeModal viene como prop desde el componente padre
      if (typeof closeModal === "function") {
        closeModal();
      }
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
