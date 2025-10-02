import { useState } from "react";
import logo from "../../assets/img/logoSena.png";
import "../../styles/TopBar.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import FormRegister from "../Form/FormVehicles/FormRegister";
export default function TopBar({ nameTopBar, nameAdmin }) {
  const [visible, stateVisible] = useState(false);

  return (
    <div className="d-flex justify-content-end align-items-center topbar ">
      <div className="d-flex  shadow-sm mt-4  containerCard">
        <div className="d-flex justify-content-between  px-3 py-1 ">
          <div className="d-flex align-items-center">
            <div className="pt-3">
              <p className="fw-bold  hour d-flex align-items-center gap-2">
                <i className="bi bi-clock-history hourIcon"></i>
                3:40 pm - 21-09-2025
              </p>
            </div>
            <div>
              <h2 className="px-4 fw-bold titleDash">{nameTopBar}</h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 bg-light  px-2 rounded">
            <div>
              <h6 className="mb-0 fw-bold nameAdmin">{nameAdmin}</h6>
              <small className="text-muted">Administrador</small>
            </div>
            <div className="me-3">
              <img
                src={logo}
                alt="Perfil de Douglas McGee"
                width="35"
                height="35"
              />
            </div>

            <button
              onClick={() => stateVisible(true)}
              className="d-flex gap-4 py-3 px-2 rounded  align-items-center btnSalidaEntrada"
            >
              <i className="pi pi-sign-in iconbtnSalidaEntrada"></i>
              <i className="pi pi-sign-in iconbtnSalidaEntrada"></i>
            </button>

            <Dialog
              header="Registrar Entrada"
              visible={visible}
              onHide={() => stateVisible(false)}
              style={{ width: "450px", maxHeight: "660px" }}
              modal
            >
              <FormRegister />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
