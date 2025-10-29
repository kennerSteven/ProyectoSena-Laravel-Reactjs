import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import HandleValidationInstructor from "./Validation/HandleValidation/HandleEntitie/HandleValidation.Instructor";
import SchemaValidationInstructor from "./Validation/SchemaValidation/SchemaValidationInstructor";

export default function FormInstructor({ closeModal }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationInstructor);

  const { perfil } = useTipoPerfilFetch("Instructor");

  const opcionesPerfil = perfil
    ? [{ value: perfil.id, label: perfil.nombre }]
    : [];

  const { onSubmit, onError } = HandleValidationInstructor({
    reset,
    perfiles: perfil ? [perfil] : [],
    closeModal,
    perfil: "Instructor",
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="row">
        <form className="d-flex gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <div className="gap-3">
              <div className="col-lg-12 mb-3">
                <InputField
                  typeInput="text"
                  name="nombre"
                  register={register}
                  error={errors.nombre}
                  labelName="Nombre"
                />
              </div>
              <div className="col-lg-12 mb-3">
                <InputField
                  typeInput="text"
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
                values={[{ value: "cc", label: "Cédula de ciudadanía" }]}
              />
              <InputField
                typeInput="text"
                name="numeroDocumento"
                register={register}
                error={errors.numeroDocumento}
                labelName="Documento"
              />
            </div>
          </div>

          <div>
            <div>
              <div className="col-lg-12 mb-3">
                <InputField
                  typeInput="number"
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
              <div className="col-lg-12 mb-3">
                <SelectOptions
                  register={register}
                  name="tipoPerfil"
                  nameSelect="Tipo de perfil"
                  error={errors.tipoPerfil}
                  values={opcionesPerfil}
                />
              </div>
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
              position="top-center"
              toastOptions={{
                style: { marginTop: "24px" },
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}