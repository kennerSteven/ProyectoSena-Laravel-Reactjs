import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useHandleValidationLogin(reset) {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const loadingToast = toast.loading("Validando login...");

 
      if (data.usuario === "kenner" && data.contrasena === "123") {
        toast.dismiss(loadingToast);
        toast.success("Login exitoso");
        reset(); //
        navigate("/dashboard"); // redirige al dashboard
      } else {
        toast.dismiss(loadingToast);
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Error al iniciar sesión");
      console.error("Error de login:", error);
    }
  };

  const onError = (errors) => {
    toast.dismiss();
    toast.error("Por favor revisa los campos");
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
