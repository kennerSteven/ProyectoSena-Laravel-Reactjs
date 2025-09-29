import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useHandleValidationLogin() {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    toast.dismiss();

    if (data.usuario === "kenner" && data.contrasena === "123") {
      navigate("/Dashboard");
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  const onError = () => {
    toast.dismiss();
    toast.error("Por favor revisa los campos marcados");
  };

  return { onSubmit, onError };
}
