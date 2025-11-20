import { useState } from "react";
import logo from "../../assets/img/logoSena.png";
import "../../styles/TopBar.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip"; // ✅ Importa Tooltip
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
}) {
  const [visibleEntrada, setVisibleEntrada] = useState(false);
  const [visibleSalida, setVisibleSalida] = useState(false);
  const [visibleTableHistorial, setVisibleTableHistorial] = useState(false);

  return (
    <div className="d-flex justify-content-end align-items-center topbar mt-3 me-2 ">
      <div className="d-flex shadow containerCard">
        <div className="d-flex justify-content-between px-3 py-1 w-100">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex gap-2 pt-2 align-items-center">
              <i className="pi pi-clock hourIcon pb-2"></i>
              <div className="mt-1">
                <ClockDisplay />
              </div>
            </div>
            <div className="me-3">
              <h2 className="fw-bold titleDash">{nameTopBar}</h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 bg-light px-2 rounded">
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

            <div className="d-flex gap-2">
              <Tooltip
                target="#btnRegistros"
                content="Ver historial de registros"
                position="top"
              />
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
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
