import { useNavigate } from "react-router-dom";

export default function useHandleValidationLogin(reset) {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.usuario === "cata" && data.contrasena === "123") {
      reset(); //
      navigate("/dashboardCata"); // redirige al dashboard
    }
      if (data.usuario === "gym" && data.contrasena === "123") {
      reset(); //
      navigate("/dashboardGym"); // redirige al dashboard
    }
      if (data.usuario === "casa" && data.contrasena === "123") {
      reset(); //
      navigate("/dashboardCasa"); // redirige al dashboard
    }
      if (data.usuario === "granja" && data.contrasena === "123") {
      reset(); //
      navigate("/dashboardGranja"); // redirige al dashboard
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError };
}
