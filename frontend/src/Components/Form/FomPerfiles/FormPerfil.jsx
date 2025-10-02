import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import { TipoPerfil } from "../../Layout/Data";
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
        <div className="formRegister shadow-sm col-12 col-md-8 col-lg-6 mx-auto p-3">
          <div className="mb-4">
            <h2 className="mt-2 ">Crear tipo de perfil</h2>
            <InputField
              typeInput="text"
              name="caracteristica"
              register={register}
              error={errors.caracteristica}
              labelName="Característica"
            />
          </div>
          <div className="mb-4">
            <SelectOptions
              name="tipoPerfil"
              register={register}
              nameSelect="Tipo de perfil"
              values={TipoPerfil}
              error={errors.tipoPerfil}
            />
          </div>
          <ButtonSubmit
            textSend="Guardar "
            textSending="Guardando..."
            isSubmitting={isSubmitting}
            iconButton="bi bi-save"
          />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                marginTop: "100px",
              },
            }}
          />
        </div>
      </div>
    </form>
  );
}
