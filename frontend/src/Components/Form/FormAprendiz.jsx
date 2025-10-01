import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { useInstructorForm } from "./Validation/HandleValidation/useHandle";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";

import SchemaValidationUser from "./Validation/SchemaValidation/SchemaValidationUser";
import { useEffect, useState } from "react";
import InputAutoComplete from "../Ui/InputAutocomplete";

export default function FormAprendiz() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationUser);

  useTipoPerfilFetch(setValue, "Aprendiz");

  const fichas = [
    {
      numeroFicha: "12345",
      nombreFicha: "Ingeniería de Sistemas",
      jornada: "Diurna",
    },
    {
      numeroFicha: "54321",
      nombreFicha: "Diseño Gráfico",
      jornada: "Nocturna",
    },
    { numeroFicha: "67890", nombreFicha: "Administración", jornada: "Diurna" },
  ];

  const { onSubmit, onError } = useInstructorForm({ reset });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="formUsers shadow-sm"
      >
        <div className="row flex-column gap-3">
          <h1 className="fw-bold">Formulario</h1>

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

       
          <div>
            <InputAutoComplete
              objFormacion={fichas}
              name="tipoFormacion"
              control={control}
              label="Tipo de formación"
            />
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
        toastOptions={{ style: { marginTop: "100px" } }}
      />
    </div>
  );
}
