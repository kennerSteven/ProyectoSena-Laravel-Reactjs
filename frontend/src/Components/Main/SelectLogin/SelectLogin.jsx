import "../../../styles/SelectLogin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../../assets/img/logoSena.png";
import { Link } from "react-router";

export default function SelectLogin() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 ">
      <div className="d-flex flex-column containerSelect shadow">
        <div className="d-flex  gap-4 align-items-center mt-2 mb-5 ">
          <img src={logo} style={{ width: "80px", height: "70px" }} />
          <h3 className="titleSelectLogin">Seleccione lugar a ingresar</h3>
        </div>

        <div className="d-flex flex-column gap-4 justify-content-center ">
          <div>
            <Link
              to={"loginGranja"}
              className="d-flex align-items-center justify-content-between   cardSelectlogin shadow-sm"
            >
              <h3>Granja</h3> <i className="bi bi-tree iconSelectLogin"></i>{" "}
            </Link>
          </div>
          <div>
            <Link
              to={"loginGym"}
              className="d-flex gap-3  align-items-center  justify-content-between   cardSelectlogin shadow-sm"
            >
              <h3>Gimnasio</h3>
              <i className="bi bi-activity iconSelectLogin"></i>
            </Link>
          </div>
          <div>
            <Link
              to={"loginCata"}
              className="d-flex gap-3  align-items-center   justify-content-between   cardSelectlogin shadow-sm"
            >
              <h3>Cata</h3>
              <i className="bi bi-mortarboard iconSelectLogin"></i>
            </Link>
          </div>

          <div>
            <Link
              to={"loginCasaApoyo"}
              className="d-flex gap-3  align-items-center   justify-content-between   cardSelectlogin shadow-sm"
            >
              <h3>Casa de apoyo</h3>
              <i className="bi bi-mortarboard iconSelectLogin"></i>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
