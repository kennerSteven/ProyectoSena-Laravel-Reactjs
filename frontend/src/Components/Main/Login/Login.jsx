import "../../../styles/Login.css";
import InputField from "../../Ui/InputField";
import SchemaValidationLogin from "../../Form/Validation/SchemaValidation/SchemaValidationLogin";
import useFormWithYup from "../../Form/Validation/connectYupRhf";
import useHandleValidationLogin from "../../Form/Validation/HandleValidation/HandleValidationLogin";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import BackButton from "../../Ui/BackButton";
import { Toaster } from "react-hot-toast";

import logoSena from "../../../assets/img/logoSena.png";
import { Link } from "react-router";

export default function Login({ entitiePlace, imgEntitiePlace }) {
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
            className="d-flex flex-column formContainer bg-light p-3 rounded shadow-sm"
          >
            <div className="mx-auto my-2">
              <img src={logoSena} alt="Logo SENA" style={{ width: "120px" }} />
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex flex-column  gap-1">
                  <div className="d-flex gap-3">
                    <Link
                      to="/"
                      className="d-flex align-items-center text-dark"
                    >
                      <BackButton />
                    </Link>
                    <h1 className="fw-bold titleLogin">Iniciar sesión</h1>
                  </div>
                  <h2 className="text-success place text-center ">
                    {entitiePlace}
                  </h2>
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
            src={imgEntitiePlace}
            className="img-fluid w-100 h-100 object-fit-cover"
            alt="Imagen Granja"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
