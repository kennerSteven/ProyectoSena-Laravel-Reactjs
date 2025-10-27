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
        <div className="formRegister shadow-sm col-12 col-md-8 col-lg-6 mx-auto p-4">
          <div className="mb-4">
            <h2 className="mt-2 ">Crear tipo de perfil</h2>
          </div>
     

   <div className="mb-4">
       <InputField
  typeInput="text"
  name="tipoPerfil" // 👈 nombre claro y semántico
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
