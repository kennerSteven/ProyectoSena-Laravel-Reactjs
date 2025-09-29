import toast from "react-hot-toast";

export default function useHandleValidationVehicle(reset, closeModal) {
  const onSubmit = async () => {
    toast.dismiss();
    toast.loading("Validando datos...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    closeModal();
    toast.dismiss();
    reset();
    toast.success(`Entrada registrada`);
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos marcados");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
