import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";

export default function Form({
  nameForm,
  tipoPerfilValue,
  SchemaValidation,
  handleValidation,
}) {
  // Inicializa el formulario con el esquema pasado como prop
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidation);

  // Hook de manejo dinámico (Instructor, Administrativo, Aprendiz)
  const { onSubmit, onError } = handleValidation({ reset });

  // Llenar el select de tipo de perfil
  useTipoPerfilFetch(setValue,  tipoPerfilValue );

  // Datos de ejemplo para fichas


  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="formUsers shadow-sm"
      >
        <div className="row flex-column gap-3">
          <h1 className="fw-bold">{nameForm}</h1>

          {/* Nombre y Apellido */}
          <div className="d-flex gap-3">
            <InputField
              typeIntput="text"
              name="nombre"
              register={register}
              error={errors.nombre}
              labelName="Nombre"
            />
            <InputField
              typeIntput="text"
              name="apellido"
              register={register}
              error={errors.apellido}
              labelName="Apellido"
            />
          </div>

          {/* Tipo de documento y Documento */}
          <div className="d-flex gap-3">
            <SelectOptions
              register={register}
              name="tipoDocumento"
              nameSelect="Tipo documento"
              error={errors.tipoDocumento}
              values={[
                { value: "CC", label: "Cédula de ciudadanía" },
                { value: "TI", label: "Tarjeta de identidad" },
              ]}
            />
            <InputField
              typeIntput="text"
              name="documento"
              register={register}
              error={errors.documento}
              labelName="Documento"
            />
          </div>

          {/* Teléfono y Tipo de sangre */}
          <div className="d-flex gap-3">
            <div className="col-lg-6">
              <InputField
                typeIntput="number"
                name="telefono"
                register={register}
                error={errors.telefono}
                labelName="Teléfono"
              />
            </div>
            <div className="col-lg-6">
              <SelectOptions
                register={register}
                name="tipoSangre"
                nameSelect="Tipo de sangre"
                error={errors.tipoSangre}
                values={[
                  { value: "A+", label: "A positivo" },
                  { value: "A-", label: "A negativo" },
                  { value: "B+", label: "B positivo" },
                  { value: "B-", label: "B negativo" },
                  { value: "AB+", label: "AB positivo" },
                  { value: "AB-", label: "AB negativo" },
                  { value: "O+", label: "O positivo" },
                  { value: "O-", label: "O negativo" },
                ]}
              />
            </div>
          </div>
          <div className="my-3">
            <InputField
              typeIntput="text"
              name="tipoPerfil"
              register={register}
              error={errors.tipoPerfil}
              labelName="Tipo perfil"
              disabled={true}
            />
          </div>

          {/* Botón de envío */}
          <ButtonSubmit
            textSend="Guardar"
            textSending="Guardando..."
            isSubmitting={isSubmitting}
            maxWidth={false}
            iconButton="bi bi-save"
          />
        </div>
      </form>

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { marginTop: "100px" },
        }}
      />
    </div>
  );
}
