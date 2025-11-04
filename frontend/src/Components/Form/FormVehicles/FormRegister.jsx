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
import Carnet from "../../Carnet";

export default function FormRegister() {
  const [visible, stateVisible] = useState(false);
  const [vehiculoData, setVehiculoData] = useState(null);
  const [modalCarnet, setModalCarnet] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationRegister, { mode: "onChange" });

  const { onSubmit, onError, entradaData, dataCarnet } =
    useHandleValidationRegister({
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
      setVehiculoData(null);
    }
  }, [tipoIngreso, documento, trigger]);

  useEffect(() => {
    if (dataCarnet && dataCarnet.nombre) {
      setModalCarnet(true);
    }
  }, [dataCarnet]);

  const handleVehiculoSuccess = (dataVehiculo) => {
    setVehiculoData(dataVehiculo);
    stateVisible(false);
  };

  function closeModalCarnet(params) {
    setModalCarnet(false);
  }

  const handleFinalSubmit = (formData) => {
    const payload = {
      numeroDocumento: formData.documento?.trim(),
      tipo: "entrada",
      ...(formData.tipoIngreso === "conVehiculo" && vehiculoData
        ? { vehiculo: vehiculoData }
        : {}),
    };

    if (!payload.numeroDocumento || !payload.tipo) {
      console.warn("Payload incompleto:", payload);
      toast.error("Faltan datos para registrar la entrada");
      return;
    }

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
          <div className="col-lg-12 mb-3"></div>
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

      <Dialog
        header="Entrada registrada exitosamente"
        visible={modalCarnet}
        style={{ width: "400px" }}
        onHide={() => setModalCarnet(false)}
      >
        {dataCarnet && (
          <Carnet
            nombre={dataCarnet.nombre}
            apellido={dataCarnet.apellido}
            tipoDoc={dataCarnet.tipoDocumento}
            numeroDoc={dataCarnet.numeroDocumento}
            telefono={dataCarnet.telefono}
            sangre={dataCarnet.tipoSangre}
            tipoPerfil={dataCarnet.perfile?.nombre}
            closeCarnet={closeModalCarnet}
          />
        )}
      </Dialog>
    </div>
  );
}
