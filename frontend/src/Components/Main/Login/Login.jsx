import "../../../styles/Login.css";
import InputField from "../../Ui/InputField";
import SchemaValidationLogin from "../../Form/Validation/SchemaValidation/SchemaValidationLogin";
import useFormWithYup from "../../Form/Validation/connectYupRhf";
import useHandleValidationLogin from "../../Form/Validation/HandleValidation/HandleValidationLogin";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import BackButton from "../../Ui/BackButton";
import { Toaster } from "react-hot-toast";
import granjaImg from "../../../assets/img/SENAGRANJA.jpg";
export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationLogin);
  const { onSubmit, onError } = useHandleValidationLogin(reset);

  return (
    <div className="">
      <div className="d-flex">
        <div className="d-flex  align-items-center justify-content-center containerLogin shadow">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="d-flex flex-column formContainer "
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-4">
                  <BackButton />
                  <div className="d-flex align-items-center  gap-3">
                    <h1 className="fw-bold titleLogin">Iniciar sesión</h1>
                    <h3 className="pt-2">
                      <strong>Granja</strong>
                    </h3>
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
              <a className="py-4 forgetPassword">Olvidó su contraseña?</a>

              <ButtonSubmit
                textSend="Iniciar sesión"
                textSending="Iniciando Sesión..."
                isSubmitting={isSubmitting}
                maxWidth={true}
                iconButton="bi bi-box-arrow-in-right"
              />
              <p className="text-center pt-4 msjCreateAccount">
                No tiene una cuenta? <a className="forgetPassword">Cree una</a>
              </p>

              <Toaster />
            </form>
          </div>
        </div>
        <div>
          <img
            src={granjaImg}
            className="img-fluid h-100 w-100 object-fit-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
