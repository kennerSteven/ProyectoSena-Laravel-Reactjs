import toast from "react-hot-toast";

export default function useHandleValidationVehicle() {
  const onSubmit = async (data) => {
    try {
      const { placa, tipoVehiculo } = data;

      if (!placa || !tipoVehiculo) {
        toast.error("Faltan datos del vehículo");
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success("Vehículo registrado exitosamente");

      return { placa, tipoVehiculo }; // ✅ objeto limpio y validado
    } catch (error) {
      toast.dismiss();
      toast.error("Error interno del servidor");
      console.error("Error en registro de vehículo:", error);
      return null;
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
