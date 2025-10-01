import SchemaValidationRegister from "../Validation/SchemaValidation/SchemaValidationRegister";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useFormWithYup from "../Validation/connectYupRhf";
import useHandleValidationVehicle from "../Validation/HandleValidation/HandleValidationRegisterVehicle";
import ModalBase from "../../Ui/ModalBase";
import UseModalControl from "../../Hooks/UseModalControl";
import FormRegisterVehicles from "./FormRegisterVehicles";
import "../../../styles/FormUser.css";

export default function FormRegister() {
  const { open, openModal, closeModal } = UseModalControl();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useFormWithYup(SchemaValidationRegister, { mode: "onChange" });

  const { onSubmit, onError } = useHandleValidationVehicle(reset, closeModal);

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
          openModal();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoIngreso, documento]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="formRegister d-flex flex-column shadow"
      >
        <div className="row flex-column">
          <h2>Registrar Vehículos</h2>

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
        <Toaster />
        <ModalBase open={open} onClose={closeModal}>
          <FormRegisterVehicles closeModal={closeModal} />
        </ModalBase>
      </form>
    </div>
  );
}
