import SchemaValidationRegister from "./Validation/SchemaValidation/SchemaValidationRegister";
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useFormWithYup from "./Validation/connectYupRhf";
import { Dialog } from "primereact/dialog";
import "../../styles/FormRegisterVehicles.css";

import FormRegisterVehicles from "./FormVehicles/FormRegisterVehicles";
import HandleValidationSalida from "./Validation/HandleValidation/HandleValidationSalida";
import logoSena from "../../assets/img/logoSena.png";
import defaultUser from "../../assets/img/iconUser.png";

export default function FormSalida() {
  const [visible, stateVisible] = useState(false);
  const [vehiculoData, setVehiculoData] = useState(null);
  const [modalSalida, setModalSalida] = useState(false);
  const [usuarioSalida, setUsuarioSalida] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormWithYup(SchemaValidationRegister, { mode: "onChange" });

  const { onSubmit, onError } = HandleValidationSalida({
    reset,
    setVisible: stateVisible,
    onSuccess: (usuario) => {
      setUsuarioSalida(usuario);
      setModalSalida(true);
    },
  });

  const documento = watch("documento");
  const tipoIngreso = watch("tipoIngreso");

  useEffect(() => {
    if (tipoIngreso === "conVehiculo") {
      trigger(["tipoDocumento", "documento"]).then((valid) => {
        if (!valid || documento.length !== 10) {
          toast.dismiss();
          toast.error("Seleccione tipo de documento y documento antes de continuar");
        } else {
          stateVisible(true);
        }
      });
    } else {
      setVehiculoData(null);
    }
  }, [tipoIngreso, documento, trigger]);

  const handleVehiculoSuccess = (dataVehiculo) => {
    setVehiculoData(dataVehiculo);
    stateVisible(false);
  };

  const handleFinalSubmit = (formData) => {
    const payload = {
      numeroDocumento: formData.documento?.trim(),
      tipo: "salida",
      ...(formData.tipoIngreso === "conVehiculo" && vehiculoData
        ? { vehiculo: vehiculoData }
        : {}),
    };

    if (!payload.numeroDocumento || !payload.tipo) {
      console.warn("Payload incompleto:", payload);
      toast.error("Faltan datos para registrar la salida");
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
          textSend="Registrar salida"
          textSending="Registrando salida..."
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
        header="Salida registrada exitosamente"
        visible={modalSalida}
        style={{ width: "500px" }}
        onHide={() => setModalSalida(false)}
      >
        {usuarioSalida && (
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <img src={logoSena} alt="Logo SENA" style={{ width: "60px" }} />
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <strong>{usuarioSalida.perfile?.nombre}</strong>
                  <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                    {new Date(usuarioSalida.fechaRegistro).toLocaleString("es-CO")}
                  </p>
                </div>
                <img
                  src={
                    usuarioSalida.foto
                      ? usuarioSalida.foto.startsWith("http")
                        ? usuarioSalida.foto
                        : `http://localhost:8000/${usuarioSalida.foto}`
                      : defaultUser
                  }
                  alt="Foto"
                  className="rounded"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border: "2px solid #ccc",
                  }}
                />
              </div>
            </div>

            <hr />

            <div>
              <h5 className="mb-2">
                {usuarioSalida.nombre} {usuarioSalida.apellido}
              </h5>
              <p className="mb-1">
                <strong>{usuarioSalida.tipoDocumento}:</strong>{" "}
                {usuarioSalida.numeroDocumento}
              </p>
              <p className="mb-1">
                <strong>Teléfono:</strong> {usuarioSalida.telefono}
              </p>
              <p className="mb-1">
                <strong>Grupo sanguíneo:</strong> {usuarioSalida.tipoSangre}
              </p>

              {usuarioSalida.perfile?.nombre?.toLowerCase() === "aprendiz" &&
                usuarioSalida.fichas && (
                  <div className="mt-3">
                    <p className="mb-1">
                      <strong>Ficha:</strong> {usuarioSalida.fichas.numeroFicha}
                    </p>
                    <p className="mb-1">
                      <strong>Programa:</strong>{" "}
                      {usuarioSalida.fichas.nombrePrograma}
                    </p>
                    <p className="mb-1">
                      <strong>Jornada:</strong> {usuarioSalida.fichas.jornada}
                    </p>
                  </div>
                )}

              <div className="mt-4 text-end">
                <button
                  className="btn btn-success"
                  onClick={() => setModalSalida(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}