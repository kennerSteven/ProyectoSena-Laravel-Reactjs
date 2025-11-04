import toast from "react-hot-toast";

export default function useHandleValidationRegister({ reset, setVisible }) {
  const onSubmit = async (formData) => {
    try {
      const loadingToast = toast.loading("Enviando datos...");

      const response = await fetch(
        "http://127.0.0.1:8000/api/entradaysalidacasa/index",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      toast.dismiss(loadingToast);

      if (!response.ok) {
        const errorText = await response.text();
        toast.error("Error al registrar entrada");
        console.error("Error del servidor:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      toast.success("Entrada registrada exitosamente");
      reset();
      setVisible(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Error interno del servidor");
      console.error("Error en onSubmit:", error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
