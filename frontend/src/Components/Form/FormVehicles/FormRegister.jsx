import SchemaValidationRegister from "../Validation/SchemaValidation/SchemaValidationRegister";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useFormWithYup from "../Validation/connectYupRhf";
import { Dialog } from "primereact/dialog";
import "../../../styles/FormRegisterVehicles.css";
import useHandleValidationRegister from "../Validation/HandleValidation/HandleValidationRegister";
import FormRegisterVehicles from "./FormRegisterVehicles";

export default function FormRegister() {
  const [visible, stateVisible] = useState(false);
  const [vehiculoData, setVehiculoData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationRegister, { mode: "onChange" });

  const { onSubmit, onError } = useHandleValidationRegister({
    reset,
    setVisible: stateVisible,
  });

  const documento = watch("documento");
  const tipoIngreso = watch("tipoIngreso");

  useEffect(() => {
    if (tipoIngreso === "conVehiculo") {
      trigger(["tipoDocumento", "documento"]).then((valid) => {
        if (!valid || documento.length !== 10) {
          toast.dismiss();
          toast.error(
            "Seleccione tipo de documento y documento antes de continuar"
          );
        } else {
          stateVisible(true);
        }
      });
    } else {
      setVehiculoData(null); // Limpiar si cambia a sinVehiculo
    }
  }, [tipoIngreso, documento, trigger]); // ✅ incluye trigger
  const handleVehiculoSuccess = (dataVehiculo) => {
    setVehiculoData(dataVehiculo);
    stateVisible(false);
  };

  const handleFinalSubmit = (formData) => {
    const payload = {
      ...formData,
      ...(formData.tipoIngreso === "conVehiculo" && vehiculoData
        ? { vehiculo: vehiculoData }
        : {}),
    };

    onSubmit(payload);
  };

  const isBlocked = tipoIngreso === "conVehiculo" && !vehiculoData;

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFinalSubmit, onError)}
        className="p-3 d-flex flex-column rounded"
      >
        <div className="row flex-column">
          <div className="col-lg-12 mb-3">
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
          <div className="col-lg-12 mb-3">
            <InputField
              typeIntput="text"
              name="documento"
              register={register}
              error={errors.documento}
              labelName="Documento"
            />
          </div>
          <div className="col-lg-12 mb-4">
            <SelectOptions
              register={register}
              name="tipoIngreso"
              nameSelect="Tipo de ingreso"
              defaultValue="sinVehiculo"
              error={errors.tipoIngreso}
              values={[
                { value: "sinVehiculo", label: "Sin vehículo" },
                { value: "conVehiculo", label: "Con vehículo" },
              ]}
            />
          </div>
        </div>

        <ButtonSubmit
          textSend="Registrar entrada"
          textSending="Registrando entrada..."
          isSubmitting={isSubmitting}
          disabled={isBlocked || isSubmitting || !isValid}
        />

        <Dialog
          header="Registrar vehículo"
          visible={visible}
          style={{ width: "30vw", maxHeight: "80vh" }}
          modal
          onHide={() => stateVisible(false)}
        >
          <FormRegisterVehicles
            closeModal={() => stateVisible(false)}
            onSuccess={handleVehiculoSuccess}
          />
        </Dialog>
        <Toaster />
      </form>
    </div>
  );
}
