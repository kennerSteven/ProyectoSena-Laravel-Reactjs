import "../../../styles/Login.css";
import InputField from "../../Ui/InputField";
import SchemaValidationLogin from "../../Form/Validation/SchemaValidation/SchemaValidationLogin";
import useFormWithYup from "../../Form/Validation/connectYupRhf";
import useHandleValidationLogin from "../../Form/Validation/HandleValidation/HandleValidationLogin";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import BackButton from "../../Ui/BackButton";
import { Toaster } from "react-hot-toast";
import granjaImg from "../../../assets/img/SENAGRANJA.jpg";
import logoSena from "../../../assets/img/logoSena.png";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationLogin);
  const { onSubmit, onError } = useHandleValidationLogin(reset);

  return (
    <div className="login-wrapper d-flex" style={{ minHeight: "100vh" }}>
      <div className="d-flex">
        <div className="d-flex align-items-center containerLogin shadow">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="d-flex flex-column formContainer mx-4 bg-light p-5 rounded shadow-sm"
          >
            <div className="mx-auto my-4">
              <img src={logoSena} alt="Logo SENA" style={{ width: "200px" }} />
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex align-items-center gap-4">
                <BackButton />
                <div className="d-flex align-items-center gap-3">
                  <h1 className="fw-bold titleLogin">Iniciar sesión</h1>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <InputField
                className="w-100"
                typeIntput="text"
                name="usuario"
                placeholder="Usuario"
                register={register}
                error={errors.usuario}
              />
            </div>

            <div>
              <InputField
                typeIntput="password"
                name="contrasena"
                placeholder="Contraseña"
                register={register}
                error={errors.contrasena}
              />
            </div>

            <a className="py-4 forgetPassword">¿Olvidó su contraseña?</a>

            <ButtonSubmit
              textSend="Iniciar sesión"
              textSending="Iniciando Sesión..."
              isSubmitting={isSubmitting}
              maxWidth={true}
              iconButton="bi bi-box-arrow-in-right"
            />

            <p className="text-center pt-4 msjCreateAccount">
              ¿No tiene una cuenta? <a className="forgetPassword">Cree una</a>
            </p>

            <Toaster />
          </form>
        </div>

        {/* Imagen lateral */}
        <div className="flex-grow-1 h-100">
          <img
            src={granjaImg}
            className="img-fluid w-100 h-100 object-fit-cover"
            alt="Imagen Granja"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
