import "../../../styles/SelectLogin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../../assets/img/logoSena.png";

export default function SelectLogin() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 ">
      <div className="d-flex flex-column containerSelect shadow">
        <div className="d-flex justify-content-center gap-4 align-items-center mb-4 ">
          <img src={logo} style={{ width: "80px", height: "70px" }} />
          <h1 className="titleSelectLogin">Seleccione lugar a registrarse</h1>
        </div>

        <div className="d-flex flex-column gap-5 align-items-center justify-content-center ">
          <div>
            <span className="d-flex align-items-center    gap-3  justify-content-between cardSelectlogin shadow-sm">
              <h3>Granja</h3> <i className="bi bi-tree iconSelectLogin"></i>{" "}
            </span>
          </div>
          <div>
            <span className="d-flex gap-3  align-items-center  justify-content-between cardSelectlogin shadow-sm">
              <h3>Gimnasio</h3>
              <i className="bi bi-activity iconSelectLogin"></i>
            </span>
          </div>
          <div>
            <span className="d-flex gap-3  align-items-center   justify-content-between cardSelectlogin shadow-sm">
              <h3>Cata</h3>
              <i className="bi bi-mortarboard iconSelectLogin"></i>
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
