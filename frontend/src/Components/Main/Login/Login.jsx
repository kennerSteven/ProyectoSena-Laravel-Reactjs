import logo from "../../../assets/img/logoSena.png";
import "../../../styles/Login.css";
import InputField from "../../Ui/InputField";
import SchemaValidationLogin from "../../Form/Validation/SchemaValidation/SchemaValidationLogin";
import useFormWithYup from "../../Form/Validation/connectYupRhf";
import useHandleValidationLogin from "../../Form/Validation/HandleValidation/HandleValidationLogin";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import BackButton from "../../Ui/BackButton";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationLogin);
  const { onSubmit, onError } = useHandleValidationLogin(reset);

  return (
    <div className="d-flex align-items-center gap-5 justify-content-center min-vh-100 ">
      <div className="d-flex  align-items-center justify-content-center gap-5 containerLogin shadow">
        <div className="me-5">
          <img src={logo} style={{ width: "230px", height: "220px" }} />
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column gap-4 formContainer "
          >
            <div className="d-flex align-items-center gap-3">
              <BackButton />
              <h1 className="fw-bold titleLogin">
                Iniciar sesión - <strong>Granja</strong>
              </h1>
            </div>

            <div>
              <InputField
                className="w-100"
                typeIntput="text"
                name="usuario"
                labelName="Usuario"
                register={register}
                error={errors.usuario}
              />
            </div>
            <div>
              <InputField
                typeIntput="password"
                name="contrasena"
                labelName="Contraseña"
                register={register}
                error={errors.contrasena}
              />
            </div>

            <ButtonSubmit
              textSend="Iniciar sesión"
              textSending="Iniciando Sesión..."
              isSubmitting={isSubmitting}
              maxWidth={true}
              iconButton="bi bi-box-arrow-in-right"
            />
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
}
