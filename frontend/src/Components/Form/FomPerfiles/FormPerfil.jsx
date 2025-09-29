import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import { TipoPerfil } from "../../Layout/Data";
import useFormWithYup from "../Validation/connectYupRhf";
import useHandleValidationFormPerfil from "../Validation/HandleValidation/HandleValidationFormPerfil";
import SchemaValidationFormPerfil from "../Validation/SchemaValidation/SchemaValidationFormPerfil";

export default function FormPerfil() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormWithYup(SchemaValidationFormPerfil);

  const { onError, onSubmit } = useHandleValidationFormPerfil(reset);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <h1>aaaaaa</h1>
        <InputField
          typeInput="text"
          name="caracteristica"
          register={register}
          error={errors.caracteristica}
          labelName="Característica"
        />
      </div>
      <div>
        <SelectOptions
          name="tipoPerfil" // 👈 corregido
          register={register}
          nameSelect="Tipo de perfil"
          values={TipoPerfil}
          error={errors.tipoPerfil} // 👈 corregido
        />
      </div>
      <ButtonSubmit
        textSend="Guardar tipo de perfil"
        textSending="Guardando tipo de usuario..."
        isSubmitting={isSubmitting} // para que el botón muestre el estado
      />
    </form>
  );
}
