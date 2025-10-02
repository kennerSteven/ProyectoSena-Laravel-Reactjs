import toast from "react-hot-toast";

export default function useHandleValidationVehicle() {
  const onSubmit = async () => {
    try {
      // const dataLaravel = {
      //   placa: data.placa,
      //   tipoVehiculo: data.tipoVehiculo,
      // };

      await new Promise((resolve) => setTimeout(resolve, 600));
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
