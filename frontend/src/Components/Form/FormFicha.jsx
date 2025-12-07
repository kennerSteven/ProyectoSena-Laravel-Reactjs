// Archivo: ./Form/FormFicha.jsx (o CrearFicha.jsx)
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import SchemaFicha from "./Validation/SchemaValidation/SchemaValidationFormacion";
import HandleValidationFicha from "./Validation/HandleValidation/HandleValidation.Ficha";

// 💡 CAMBIO CLAVE: Cambiar 'closeModal' por 'onAceptar' para que coincida con el padre
export default function CrearFicha({ onAceptar, fichaSeleccionada }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaFicha);

  const { onSubmit, onError } = HandleValidationFicha({
    reset,
    // 💡 PASAMOS LA FUNCIÓN DE CALLBACK con el nuevo nombre
    closeModalAndRefresh: onAceptar,
    fichaSeleccionada,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="">
          <div className="my-2">
            <InputField
              typeInput="text"
              name="numeroFicha"
              register={register}
              error={errors.numeroFicha}
              labelName="Número de ficha"
            />
          </div>

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

          <div className="my-3">
            <InputField
              typeInput="text"
              name="nombreFormacion"
              register={register}
              error={errors.nombreFormacion}
              labelName="Nombre de la formación"
            />
          </div>

          <div className="d-flex justify-content-end mt-4">
            <ButtonSubmit
              textSend={
                fichaSeleccionada ? "Actualizar ficha" : "Guardar ficha"
              }
              textSending="Guardando..."
              isSubmitting={isSubmitting}
              maxWidth={false}
              iconButton="bi bi-save"
            />
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: { marginTop: "60px" },
          }}
        />
      </form>
    </div>
  );
}
