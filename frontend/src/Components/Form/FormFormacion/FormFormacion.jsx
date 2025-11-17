import ButtonSubmit from "../../Ui/ButtonSubmit";
import InputField from "../../Ui/InputField";
import SelectOptions from "../../Ui/SelectOptions";
import useFormWithYup from "../Validation/connectYupRhf";
import HandleValidationInstructor from "../Validation/HandleValidation/HandleEntitie/HandleValidation.Instructor";
import SchemaValidationFormacion from "../Validation/SchemaValidation/SchemaValidationFormacion";
import "../../../styles/FormFormacion.css";

import { Toaster } from "react-hot-toast";
export default function FormFormacion({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useFormWithYup(SchemaValidationFormacion);

  const { onError, onSubmit } = HandleValidationInstructor(reset, closeModal);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="formFormacion mx-auto p-4"
    >
      <h2>Crear formación</h2>

      <div className="  d-flex gap-2">
        <div className=" mb-3">
          <InputField
            typeIntput="text"
            name="numeroFicha"
            register={register}
            error={errors.numeroFicha}
            placeholder=""
            labelName="Numero de ficha"
            disabled={false}
          />
        </div>

        <div className=" mb-3">
          <InputField
            typeIntput="text"
            name="nombrePrograma"
            register={register}
            error={errors.nombrePrograma}
            placeholder=""
            labelName="Nombre del programa"
            disabled={false}
          />
        </div>
      </div>

      <div className="mb-4">
        <SelectOptions
          register={register}
          name="jornada"
          nameSelect="Jornada"
          error={errors.jornada}
          values={[
            { value: "mañana", label: "Mañana" },
            { value: "tarde", label: "Tarde" },
            { value: "noche", label: "Noche" },
          ]}
        />
      </div>
      <SelectOptions
        register={register}
        name="estado"
        nameSelect="Estado"
        defaultValue="activo"
        values={[
          { value: "activo", label: "Activo" },
          { value: "inactivo", label: "Inactivo" },
        ]}
      />
      <div className="mt-4">
        <ButtonSubmit
          textSend="Crear formacióm"
          textSending="Creando formación..."
          iconButton="pi pi-save"
          isSubmitting={isSubmitting}
        />
      </div>

      <Toaster position="top-right" containerStyle={{ marginTop: "90px" }} />
    </form>
  );
}
