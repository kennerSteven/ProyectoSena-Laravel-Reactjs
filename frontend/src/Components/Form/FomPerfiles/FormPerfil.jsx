import ButtonSubmit from "../../Ui/ButtonSubmit";

import InputField from "../../Ui/InputField";

import useFormWithYup from "../Validation/connectYupRhf";
import usePerfilForm from "../Validation/HandleValidation/HandleValidationPerfil";
import SchemaValidationFormPerfil from "../Validation/SchemaValidation/SchemaValidationFormPerfil";
import "../../../styles/FormPerfil.css";
import { Toaster } from "react-hot-toast";
export default function FormPerfil() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormWithYup(SchemaValidationFormPerfil);

  const { onError, onSubmit } = usePerfilForm({ reset });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="d-flex justify-content-center align-items-center  "
    >
      <div className="row">
        <div className="formRegister ">
          <div className="my-3">
            <InputField
              typeInput="text"
              name="tipoPerfil"
              register={register}
              error={errors.tipoPerfil}
              labelName="Nombre del perfil"
            />
          </div>

          <div className="mb-4">
            <InputField
              typeInput="text"
              name="descripcion"
              register={register}
              error={errors.descripcion}
              labelName="Descripcion"
            />
          </div>
          <ButtonSubmit
            textSend="Guardar "
            textSending="Guardando..."
            isSubmitting={isSubmitting}
            iconButton="bi bi-save"
          />
        </div>
      </div>
    </form>
  );
}
