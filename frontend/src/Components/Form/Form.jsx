import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import { IoCloseSharp } from "react-icons/io5";
export default function Form({
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
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidation);

  // Hook de manejo dinámico (Instructor, Administrativo, Aprendiz)
  const { onSubmit, onError } = handleValidation({ reset });

  // Llenar el select de tipo de perfil
  useTipoPerfilFetch(setValue, tipoPerfilValue);

  // Datos de ejemplo para fichas

  return (
    <div className="d-flex justify-content-center  ">
      <div className="row   ">
        <form
          className="d-flex gap-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <div className=" gap-3">
              <div className="col-lg-12 mb-3">
                <InputField
                  typeIntput="text"
                  name="nombre"
                  register={register}
                  error={errors.nombre}
                  labelName="Nombre"
                />
              </div>
              <div className="col-lg-12 mb-3">
                <InputField
                  typeIntput="text"
                  name="apellido"
                  register={register}
                  error={errors.apellido}
                  labelName="Apellido"
                />
              </div>
            </div>

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
                name="numeroDocumento"
                register={register}
                error={errors.numeroDocumento}
                labelName="Documento"
              />
            </div>
          </div>
          <div>
            <div className=" ">
              <div className="col-lg-12 mb-3">
                <InputField
                  typeIntput="number"
                  name="telefono"
                  register={register}
                  error={errors.telefono}
                  labelName="Teléfono"
                />
              </div>
              <div className="col-lg-12 mb-3">
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

            <div className="col-12 d-flex justify-content-end mt-4 mb-2">
              <ButtonSubmit
                textSend="Guardar"
                textSending="Guardando..."
                isSubmitting={isSubmitting}
                maxWidth={false}
                iconButton="bi bi-save"
              />
            </div>

            <Toaster
              position="top-right"
              toastOptions={{
                style: { marginTop: "100px" },
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
