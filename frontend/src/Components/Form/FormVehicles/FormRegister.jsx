import SchemaValidationRegister from "../Validation/SchemaValidation/SchemaValidationRegister";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useFormWithYup from "../Validation/connectYupRhf";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import "../../../styles/FormRegisterVehicles.css";
import useHandleValidationRegister from "../Validation/HandleValidation/HandleValidationRegister";
import FormRegisterVehicles from "./FormRegisterVehicles";
export default function FormRegister() {
  const [visible, stateVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoIngreso, documento]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="p-3 d-flex flex-column rounded "
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
              defaultValue="sinVehiculosss"
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
        />

        <Dialog
          header="Registar vehiculo"
          visible={visible}
          style={{ width: "25vw", maxHeight: "50vh" }}
          modal
          onHide={() => stateVisible(false)} // cerrar modal
        >
          <FormRegisterVehicles closeModal={() => stateVisible(false)} />
        </Dialog>
        <Toaster />
      </form>
    </div>
  );
}
