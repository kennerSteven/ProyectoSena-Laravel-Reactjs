import { useState } from "react";
import logo from "../../assets/img/logoSena.png";
import "../../styles/TopBar.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button"; // 🔑 Importación faltante: Botón para el modal
import { useNavigate } from "react-router-dom"; // 🔑 Importación faltante: Para la redirección
import FormRegister from "../Form/FormVehicles/FormRegister";
import ClockDisplay from "../ClockDisplay";
import TablaHistorial from "../TableHistorial";
import FormSalida from "../Form/FormSalida";

export default function TopBar({
  nameTopBar,
  nameAdmin,
  showEntrada,
  getRegisters,
  createRegister,
  createSalida,
  showColumnaIngreso,
  showConVehiculoSalida,
  showPlaca,
  salidaMasiva,
  btnSalidaMasiva,
}) {
  const [visibleEntrada, setVisibleEntrada] = useState(false);
  const [visibleSalida, setVisibleSalida] = useState(false);
  const [visibleTableHistorial, setVisibleTableHistorial] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const logoutDialogFooter = (
    <div className="d-flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="btnCancelar"
        onClick={() => setShowLogoutModal(false)}
      />

      <Button
        label="Confirmar"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={handleConfirmLogout}
      />
    </div>
  );

  return (
    <div className="d-flex mt-2 mx-4">
      <div className="d-flex shadow w-100 rounded">
        <div className="d-flex justify-content-between w-100 p-2 ">
          <div className="d-flex gap-2 bg-white p-2 rounded">
            <Tooltip
              target="#btnRegistros"
              content="Ver historial de registros"
              position="top"
            />

            <Tooltip
              target="#btnEntrada"
              content="Registrar entrada"
              position="top"
            />

            <button
              id="btnEntrada"
              onClick={() => setVisibleEntrada(true)}
              className="d-flex gap-2 py-2 px-3 rounded align-items-center btnEntrada"
            >
              <span className="d-flex align-items-center gap-2">
                <i className="pi pi-sign-in iconbtnSalidaEntrada"></i>
              </span>
            </button>

            <Tooltip target="#btnSalida" content="Salida" position="top" />

            <button
              id="btnSalida"
              onClick={() => setVisibleSalida(true)}
              className="d-flex gap-2 py-3 px-3 rounded align-items-center btnSalida"
            >
              <span className="d-flex align-items-center gap-2">
                <i className="pi pi-sign-out iconbtnSalidaEntrada"></i>
              </span>
            </button>

            <button
              id="btnRegistros"
              onClick={() => setVisibleTableHistorial(true)}
              className="btnRegistros"
            >
              <span className="d-flex align-items-center gap-2 fw-bold">
                <i className="pi pi-table iconRegistros"></i>
                Registros
              </span>
            </button>
          </div>

          <div className="d-flex align-items-center gap-3 bg-white p-2 rounded">
            <div className="d-flex gap-2 pt-2 align-items-center">
              <i className="pi pi-clock hourIcon pb-2"></i>

              <div className="mt-2">
                <ClockDisplay />
              </div>
            </div>

            <div className="me-3">
              <h2 className="fw-bold titleDash">{nameTopBar}</h2>
            </div>

            <div>
              <h6 className="mb-0 fw-bold nameAdmin">{nameAdmin}</h6>
              <small className="text-muted">Administrador</small>
            </div>

            <div className="me-3">
              <img
                src={logo}
                alt="Perfil de administrador"
                width="35"
                height="35"
              />
            </div>

            <button
              className="btn btn-danger d-flex gap-2 align-items-center"
              onClick={() => setShowLogoutModal(true)}
            >
              <i className="pi pi-power-off"></i>
              Cerrar sesión{" "}
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 bg-light px-2 rounded">
          <Dialog
            header="Registrar Entrada"
            visible={visibleEntrada}
            onHide={() => setVisibleEntrada(false)}
            style={{ width: "520px" }}
          >
            <FormRegister
              showEntrada={showEntrada}
              createRegister={createRegister}
            />
          </Dialog>
          <Dialog
            header="Registrar Salida"
            visible={visibleSalida}
            onHide={() => setVisibleSalida(false)}
            style={{ width: "520px" }}
          >
            <FormSalida
              createSalida={createSalida}
              showTipoIngreso={showConVehiculoSalida}
              salidaMasiva={salidaMasiva}
              btnSalidaMasiva={btnSalidaMasiva}
            />
          </Dialog>

          <Dialog
            header="Historial de registros"
            visible={visibleTableHistorial}
            onHide={() => setVisibleTableHistorial(false)}
            className="shadow-sm"
          >
            <TablaHistorial
              getRegisters={getRegisters}
              showColumnaIngreso={showColumnaIngreso}
              showPlaca={showPlaca}
            />
          </Dialog>

          <Dialog
            header="Cerrar sesión"
            visible={showLogoutModal}
            style={{ width: "450px" }}
            modal
            onHide={() => setShowLogoutModal(false)}
            footer={logoutDialogFooter}
          >
            <div className="d-flex align-items-center">
              <span className="py-2">
                ¿Estás seguro de que deseas cerrar sesión y salir del sistema?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
