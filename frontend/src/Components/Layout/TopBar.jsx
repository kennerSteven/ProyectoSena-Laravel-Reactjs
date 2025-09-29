import logo from "../../assets/img/logoSena.png";
import "../../styles/TopBar.css";

export default function TopBar({ nameTopBar, nameAdmin }) {
  return (
    <div className="d-flex justify-content-end align-items-center topbar ">
      <div className=" shadow-sm mt-4  containerCard">
        <div className="d-flex cardImg px-5 py-1 ">
          <div className="pt-3">
            <p className="fw-bold hour d-flex gap-3">
              <i className="bi bi-clock-history hourIcon"></i>
              3:40 pm - 21-09-2025
            </p>
          </div>
          <div>
            <h1 className="px-5 fw-bold titleDash">{nameTopBar}</h1>
          </div>
          <div className="d-flex align-items-center gap-3 bg-light py-1 px-4 rounded">
            <div>
              <h6 className="mb-0 fw-bold">{nameAdmin}</h6>
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
          </div>
        </div>
      </div>
    </div>
  );
}
