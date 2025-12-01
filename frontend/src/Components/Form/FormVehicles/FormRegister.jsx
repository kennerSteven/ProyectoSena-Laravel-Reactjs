import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Dialog } from "primereact/dialog";

import SchemaValidationRegister from "../Validation/SchemaValidation/SchemaValidationRegister";
import ButtonSubmit from "../../Ui/ButtonSubmit";
import SelectOptions from "../../Ui/SelectOptions";
import InputField from "../../Ui/InputField";
import useFormWithYup from "../Validation/connectYupRhf";
import useHandleValidationRegister from "../Validation/HandleValidation/HandleValidationRegister";
import FormRegisterVehicles from "./FormRegisterVehicles";
import Carnet from "../../Carnet";

import "../../../styles/FormRegisterVehicles.css";

export default function FormRegister({ showEntrada = true, createRegister }) {
  const [visible, setVisible] = useState(false);
  const [vehiculoData, setVehiculoData] = useState(null);
  const [modalCarnet, setModalCarnet] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationRegister, {
    mode: "onChange",
    defaultValues: {
      tipoIngreso: "sinVehiculo",
    },
  });

  const documento = watch("documento")?.trim();
  const tipoIngreso = showEntrada ? watch("tipoIngreso") : "sinVehiculo";

  const { onSubmit, onError, dataCarnet } = useHandleValidationRegister({
    reset,
    setVisible,
    createRegister,
  });

  useEffect(() => {
    if (!showEntrada) return;

    if (tipoIngreso === "conVehiculo") {
      trigger(["documento"]).then((valid) => {
        if (!valid || !documento || documento.length < 6) {
          console.log("Completa el documento antes de continuar");
        } else {
          setVisible(true);
        }
      });
    } else {
      setVehiculoData(null);
    }
  }, [tipoIngreso, documento, trigger, showEntrada]);

  useEffect(() => {
    if (dataCarnet?.nombre) {
      setModalCarnet(true);
    }
  }, [dataCarnet]);

  const handleVehiculoSuccess = (dataVehiculo) => {
    setVehiculoData(dataVehiculo);
    setVisible(false);
  };

  const closeModalCarnet = () => {
    setModalCarnet(false);
  };

  const handleFinalSubmit = async (formData) => {
    const tipo = showEntrada ? formData.tipoIngreso : "sinVehiculo";
    const documentoLimpio = formData.documento?.trim();

    if (!documentoLimpio || documentoLimpio.length < 6) {
      toast.error("Documento inválido");
      return;
    }

    if (
      tipo === "conVehiculo" &&
      (!vehiculoData?.placa || !vehiculoData?.tipoVehiculo)
    ) {
      return;
    }

    const payload = {
      numeroDocumento: documentoLimpio,
      tipoMovimiento: "entrada",
      tieneVehiculo: tipo === "conVehiculo",
      ...(tipo === "conVehiculo" &&
        vehiculoData && {
          placa: vehiculoData.placa,
          tipoVehiculo: vehiculoData.tipoVehiculo,
        }),
    };

    console.log("Payload enviado:", payload);
    await onSubmit(payload);
  };

  const isBlocked =
    tipoIngreso === "conVehiculo" &&
    (!vehiculoData?.placa || !vehiculoData?.tipoVehiculo);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFinalSubmit, onError)}
        className="p-3 d-flex flex-column rounded"
      >
        <div className="row flex-column">
          <div className="col-lg-12 mb-3">
            <InputField
              typeIntput="text"
              name="documento"
              register={register}
              error={errors.documento}
              labelName="Documento"
            />
          </div>

          {showEntrada && (
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
          )}
        </div>

        <div>
          <div className="mb-3">
            <ButtonSubmit
              textSend="Registrar entrada"
              textSending="Registrando entrada..."
              isSubmitting={isSubmitting}
              iconButton="pi pi-sign-in"
              disabled={isBlocked || isSubmitting || !isValid}
            />
          </div>
        </div>

        <Dialog
          header="Registrar vehículo"
          visible={visible}
          style={{ width: "450px" }}
          modal
          onHide={() => setVisible(false)}
        >
          <FormRegisterVehicles
            closeModal={() => setVisible(false)}
            onSuccess={handleVehiculoSuccess}
          />
        </Dialog>

        <Toaster />
      </form>

      <Dialog
        header="Entrada registrada exitosamente"
        visible={modalCarnet}
        style={{ width: "450px" }}
        onHide={closeModalCarnet}
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
            formacion={
              dataCarnet.perfile?.nombre?.toLowerCase() === "aprendiz"
                ? dataCarnet.fichas?.nombrePrograma
                : null
            }
            foto={dataCarnet.foto}
            closeCarnet={closeModalCarnet}
          />
        )}
      </Dialog>
    </div>
  );
}
