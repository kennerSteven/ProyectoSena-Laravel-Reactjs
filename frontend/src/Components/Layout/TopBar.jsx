import { useState } from "react";
import logo from "../../assets/img/logoSena.png";
import "../../styles/TopBar.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import FormRegister from "../Form/FormVehicles/FormRegister";
import ClockDisplay from "../ClockDisplay";
import TablaHistorial from "../TableHistorial";
import FormSalida from "../Form/FormSalida";

export default function TopBar({ nameTopBar, nameAdmin }) {
  const [visibleEntrada, setVisibleEntrada] = useState(false); // ✅ entrada
  const [visibleSalida, setVisibleSalida] = useState(false); // ✅ salida
  const [visibleTableHistorial, setVisibleTableHistorial] = useState(false);

  return (
    <div className="d-flex justify-content-end align-items-center topbar mt-3">
      <div className="d-flex shadow containerCard">
        <div className="d-flex justify-content-between px-3 py-1 w-100">
          {/* Left section */}
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex gap-2 pt-2">
              <i className="bi bi-clock-history hourIcon"></i>
              <div className="mt-1">
                <ClockDisplay />
              </div>
            </div>
            <div className="me-3">
              <h2 className="fw-bold titleDash">{nameTopBar}</h2>
            </div>
          </div>

          {/* Right section */}
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
              {/* Botón Ver registros */}
              <button
                onClick={() => setVisibleTableHistorial(true)}
                className="btnRegistros"
              >
                <span className="d-flex align-items-center gap-2">
                  <i className="pi pi-table iconRegistros text-light"></i>
                  <span>Ver registros</span>
                </span>
              </button>

              {/* Botón Entrada */}
              <button
                onClick={() => setVisibleEntrada(true)} // ✅ abre entrada
                className="d-flex gap-2 py-2 px-3 rounded align-items-center btnSalidaEntrada"
              >
                <span className="d-flex align-items-center gap-2">
                  <i className="pi pi-sign-in iconbtnSalidaEntrada"></i>
                </span>
              </button>

              {/* Botón Salida */}
              <button
                onClick={() => setVisibleSalida(true)} // ✅ abre salida
                className="d-flex gap-2 py-3 px-3 rounded align-items-center btnSalidaEntrada bg-danger"
              >
                <span className="d-flex align-items-center gap-2">
                  <i className="pi pi-sign-out iconbtnSalidaEntrada"></i>
                </span>
              </button>
            </div>

            {/* Modal Entrada */}
            <Dialog
              header="Registrar Entrada"
              visible={visibleEntrada}
              onHide={() => setVisibleEntrada(false)}
              style={{ width: "370px", maxHeight: "660px" }}
            >
              <FormRegister />
            </Dialog>

            {/* Modal Salida */}
            <Dialog
              header="Registrar Salida"
              visible={visibleSalida}
              onHide={() => setVisibleSalida(false)}
              style={{ width: "370px", maxHeight: "660px" }}
            >
              <FormSalida />
            </Dialog>

            {/* Modal Historial */}
            <Dialog
              header="Historial de registros"
              visible={visibleTableHistorial}
              onHide={() => setVisibleTableHistorial(false)}
              className="shadow-sm"
            >
              <TablaHistorial />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
