import ButtonSubmit from "../../Ui/ButtonSubmit";
import InputField from "../../Ui/InputField";
import SelectOptions from "../../Ui/SelectOptions";

import SchemaValidationRegisterVehicle from "../Validation/SchemaValidation/SchemaValidationRegisterVehicle";
import useFormWithYup from "../Validation/connectYupRhf";
import "../../../styles/FormRegisterVehicles.css";
import useHandleValidationVehicle from "../Validation/HandleValidation/HandleValidationRegisterVehicle";

export default function FormRegisterVehicles() {
  const {
    register,

    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationRegisterVehicle, { mode: "onChange" });

  const { onSubmit, onError } = useHandleValidationVehicle();

  const ValidationButtonDisabled = !isValid || isSubmitting;

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="formRegisterVehicles d-flex flex-column"
      >
        <div className="row flex-column">
          <h2>Registrar Vehículos</h2>

          <div className="col-lg-12 mb-4">
            <InputField
              typeIntput="text"
              name="placa"
              register={register}
              error={errors.placa}
              labelName="Placa"
            />
          </div>

          <div className="col-lg-12 mb-4">
            <SelectOptions
              defaultValue=""
              register={register}
              name="tipoVehiculo"
              nameSelect="Tipo de vehículo"
              error={errors.tipoVehiculo}
              values={[
                { value: "moto", label: "Moto" },
                { value: "carro", label: "Carro" },
                { value: "bus", label: "Bus" },
                { value: "camion", label: "Camión" },
                { value: "campero", label: "Campero" },
              ]}
            />
          </div>
        </div>

        <ButtonSubmit
          textSend="Registrar vehículo"
          textSending="Registrando vehículo..."
          isSubmitting={isSubmitting}
          disabled={ValidationButtonDisabled}
        />
      </form>
    </div>
  );
}
