import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";

import { Toaster } from "react-hot-toast";

import SchemaValidationUser from "./Validation/SchemaValidation/SchemaValidationUser";
import InputAutoComplete from "../Ui/InputAutocomplete";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import HandleValidationAprendiz from "./Validation/HandleValidation/HandleEntitie/HandleValidation.Aprendiz";
export default function FormAprendiz({closeModal}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationUser);



  const { perfil } = useTipoPerfilFetch("Aprendiz");



  const opcionesPerfil = perfil
    ? [{ value: perfil.id, label: perfil.nombre }]
    : [];



  const { onSubmit, onError } = HandleValidationAprendiz({
    reset,
    perfiles: perfil ? [perfil] : [],
    closeModal,
    perfil: "Aprendiz",
  });


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



  return (
    <div className="container ">
      <form
        className="row mt-4 formUsers mx-auto"
         onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* Columna izquierda */}
        <div className="col-12 col-lg-6">
          <div className="mb-3">
            <InputField
              typeInput="text"
              name="nombre"
              register={register}
              error={errors.nombre}
              labelName="Nombre"
            />
          </div>

          <div className="mb-4">
            <InputField
              typeInput="text"
              name="apellido"
              register={register}
              error={errors.apellido}
              labelName="Apellido"
            />
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
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
            </div>
            <div className="col-12 col-md-6">
              <InputField
                typeIntput="text"
                name="numeroDocumento"
                register={register}
                error={errors.numeroDocumento}
                labelName="Numero de documento"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-12 col-lg-6">
          <div className="row g-3">
            <div className="col-12 col-md-6 mb-3">
              <InputField
                typeIntput="number"
                name="telefono"
                register={register}
                error={errors.telefono}
                labelName="Teléfono"
              />
            </div>
            <div className="col-12 col-md-6">
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
          <div className="mb-3">
            <InputAutoComplete
              objFormacion={fichas}
              name="tipoFormacion"
              control={control}
              label="Tipo de formación"
            />
          </div>

          <SelectOptions
            typeIntput="text"
            name="tipoPerfil"
            register={register}
            error={errors.tipoPerfil}
            labelName="Tipo perfil"
           values={opcionesPerfil}
          />
        </div>

        {/* Botón Guardar */}
        <div className="col-12 d-flex justify-content-end mt-2 mb-2">
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
