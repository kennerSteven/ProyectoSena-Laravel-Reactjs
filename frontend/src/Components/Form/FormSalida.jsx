import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Dialog } from "primereact/dialog";

import SchemaValidationSalida from "./Validation/SchemaValidation/SchemaValidationSalida";
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import FormRegisterVehicles from "./FormVehicles/FormRegisterVehicles";
import Carnet from "../Carnet";
import useHandleValidationSalida from "../Form/Validation/HandleValidation/HandleValidationSalida";

import "../../styles/FormRegisterVehicles.css";

export default function FormSalida({
  createSalida,
  showTipoIngreso = true,
  salidaMasiva,
}) {
  const [visible, setVisible] = useState(false);
  const [vehiculoData, setVehiculoData] = useState(null);
  const [modalSalida, setModalSalida] = useState(false);
  const [modalMasivo, setModalMasivo] = useState(false);
  const [loadingMasivo, setLoadingMasivo] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationSalida, {
    mode: "onChange",
    defaultValues: {
      tipoIngreso: "sinVehiculo",
    },
  });

  const documento = watch("documento");
  const tipoIngreso = showTipoIngreso ? watch("tipoIngreso") : "sinVehiculo";

  const { onSubmit, onError, usuarioSalida } = useHandleValidationSalida({
    reset,
    setVisible,
    createSalida,
    onSuccess: () => setModalSalida(true),
  });

  useEffect(() => {
    if (tipoIngreso === "conVehiculo") {
      trigger(["documento"]).then((valid) => {
        if (!valid || documento.length < 6) {
          toast.error("Completa el documento antes de continuar");
        } else {
          setVisible(true);
        }
      });
    } else {
      setVehiculoData(null);
    }
  }, [tipoIngreso, documento, trigger]);

  const handleVehiculoSuccess = (dataVehiculo) => {
    setVehiculoData(dataVehiculo);
    setVisible(false);
  };

  const closeModalSalida = () => {
    setModalSalida(false);
  };

  const handleFinalSubmit = async (formData) => {
    const tipo = showTipoIngreso ? formData.tipoIngreso : "sinVehiculo";

    if (
      tipo === "conVehiculo" &&
      (!vehiculoData?.placa || !vehiculoData?.tipoVehiculo)
    ) {
      return;
    }

    const payload = {
      numeroDocumento: formData.documento?.trim(),
      tipoMovimiento: "salida",
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

  const handleSalidaMasiva = async () => {
    try {
      toast.dismiss();
      setLoadingMasivo(true);

      const response = await fetch(salidaMasiva, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al procesar salida masiva");
      }

      Swal.fire({
        icon: "success",
        title: "Salida masiva",
        text: result.message || "La salida masiva fue ejecutada correctamente",
        confirmButtonText: "Aceptar",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });

      setModalMasivo(false);
    } catch (error) {
      console.error("Error en salida masiva:", error);
      Swal.fire({
        icon: "error",
        title: "Error en salida masiva",
        text: error.message || "No se pudo completar la operación.",
      });
    } finally {
      setLoadingMasivo(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFinalSubmit, onError)}
        className="p-1 d-flex flex-column rounded"
      >
        <div className="row">
          <div className="col-lg-12 mb-3">
            <InputField
              typeIntput="text"
              name="documento"
              register={register}
              error={errors.documento}
              labelName="Documento"
            />
          </div>

          {showTipoIngreso && (
            <div className="col-lg-12">
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

        <div className="mt-4 d-flex gap-2 mx-auto align-items-center">
          <ButtonSubmit
            textSend="Salida"
            textSending="Registrando salida..."
            isSubmitting={isSubmitting}
            iconButton="pi pi-sign-in"
            disabled={isBlocked || isSubmitting || !isValid}
          />

          <button
            type="button"
            className="btnSalidaMasiva d-flex gap-2 align-items-center"
            onClick={() => setModalMasivo(true)}
          >
            <i className="pi pi-sign-out"></i>
            Salida masiva
          </button>
        </div>

        <Dialog
          header="Registrar vehículo"
          visible={visible}
          style={{ width: "500px" }}
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
        header="Salida registrada exitosamente"
        visible={modalSalida}
        style={{ width: "450px" }}
        onHide={closeModalSalida}
      >
        {usuarioSalida && (
          <Carnet
            nombre={usuarioSalida.nombre}
            apellido={usuarioSalida.apellido}
            tipoDoc={usuarioSalida.tipoDocumento}
            numeroDoc={usuarioSalida.numeroDocumento}
            telefono={usuarioSalida.telefono}
            sangre={usuarioSalida.tipoSangre}
            tipoPerfil={usuarioSalida.perfile?.nombre}
            formacion={
              usuarioSalida.perfile?.nombre?.toLowerCase() === "aprendiz"
                ? usuarioSalida.fichas?.nombrePrograma
                : null
            }
            foto={usuarioSalida.foto}
            closeCarnet={closeModalSalida}
          />
        )}
      </Dialog>

      <Dialog
        header="¿Confirmar salida masiva?"
        visible={modalMasivo}
        style={{ width: "400px" }}
        modal
        onHide={() => setModalMasivo(false)}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => setModalMasivo(false)}
              disabled={loadingMasivo}
            >
              Cancelar
            </button>
            <button
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={handleSalidaMasiva}
              disabled={loadingMasivo}
            >
              {loadingMasivo ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                  Procesando...
                </>
              ) : (
                "Aceptar salida masiva"
              )}
            </button>
          </div>
        }
      >
        <p>¿Estás seguro de que deseas registrar la salida masiva?</p>
      </Dialog>
    </div>
  );
}
