import toast from "react-hot-toast";

export default function HandleValidationSalida({ reset, setVisible }) {
  const onSubmit = async (formValues) => {
    let loadingToast;

    try {
      // Paso 1: Buscar usuario por número de documento
      loadingToast = toast.loading("Buscando usuario...");
      const buscarResponse = await fetch(
        `http://127.0.0.1:8000/api/usuario/buscar/${formValues.numeroDocumento}`
      );

      const data = await buscarResponse.json();

      if (!buscarResponse.ok || !data.usuario) {
        toast.dismiss(loadingToast);
        toast.error("Usuario no encontrado");
        console.error("Error al buscar usuario:", data);
        return;
      }

      const usuario = data.usuario;
      console.log("ID del usuario:", usuario.id);

      // Paso 2: Registrar salida
      toast.dismiss(loadingToast);
      loadingToast = toast.loading("Registrando salida...");

      const payload = {
        numeroDocumento: usuario.numeroDocumento,
        idusuario: usuario.id,
        tipo: "salida",
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/entradaysalidagym/salidagym",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok || result.error) {
        toast.error(result.error || "Error al registrar salida");
        console.error("Error del servidor:", result);
        return;
      }

      const perfilSalida =
        result?.data?.usuarios?.perfile?.nombre || "Perfil no disponible";
      console.log("Perfil que dio salida:", perfilSalida);

      toast.success("Salida registrada correctamente");

      reset();
      setVisible(false);
    } catch (error) {
      console.error("Error en onSubmit:", error);
      toast.dismiss(loadingToast);
      toast.error("Error inesperado al registrar salida");
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}