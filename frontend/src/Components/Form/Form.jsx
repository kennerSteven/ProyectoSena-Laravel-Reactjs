import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";

import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
export default function Form({ SchemaValidation, handleValidation, FormName }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidation);

  const { onSubmit, onError } = handleValidation({ reset });

  return (
    <div className=" d-flex  justify-content-center align-items-center ">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="formUsers shadow-sm"
      >
        <div className="row flex-column gap-3">
          <h1 className="fw-bold">{FormName}</h1>

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

          <div className="d-flex gap-3">
            <SelectOptions
              register={register}
              name="tipoDocumento"
              nameSelect="Tipo documento"
              error={errors.tipoDocumento}
              values={[
                { value: "CC", label: "Cedula de ciudadania" },
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

          <div className="d-flex gap-3">
            <div className="col-lg-6">
              <InputField
                typeIntput="number"
                name="telefono"
                register={register}
                error={errors.telefono}
                labelName="Telefono"
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

          <ButtonSubmit
            textSend="Guardar"
            textSending="Guardando..."
            isSubmitting={isSubmitting}
            maxWidth={false}
            iconButton="bi bi-save"
          />
        </div>
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "100px",
          },
        }}
      />
    </div>
  );
}
