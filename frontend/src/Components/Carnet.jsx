import logoSena from "../assets/img/logoSena.png";
import icon from "../assets/img/iconUser.png";
import "../styles/Carnet.css";
export default function Carnet({
  nombre,
  tipoDoc,
  numeroDoc,
  sangre,
  telefono,
  tipoPerfil,
  apellido,
  closeCarnet
}) {
  return (
    <div className="containerC">
      <div className="containerCarnet  ">
        <div className="d-flex justify-content-between px-3 py-2">
          <div className="mt-2">
            <img src={logoSena} style={{ width: "60px" }} />
          </div>

          <div className="d-flex align-items-end gap-2 mt-2">
            <small className="fw-bold">{tipoPerfil}</small>
            <img src={icon} alt="" style={{ width: "90px" }} />
          </div>
        </div>
        <hr className="SeparatorCarnet" />
        <div className="infoCarnet px-3 py-4">
          <strong className="strong1 mb-5">
            {nombre} {apellido}
          </strong>
          <div className="d-flex flex-column mt-2">
            <p className="normalText ">
              {tipoDoc}: {numeroDoc}
            </p>
            <p className="normalText">{sangre}</p>
            <p className="normalText">{telefono}</p>
          </div>
          <div className="d-flex flex-column">
            <hr />
            <div className="d-flex flex-column gap-1">
              <small>Regional Santander</small>
              <strong className="strong2">
                Tg. Analisis y Desarrollo de software
              </strong>
              <strong className="strong2">
                Centro Agroempresarial y turistico de los Andes.
              </strong>
            </div>
          </div>
        </div>
      </div>

<div className="d-flex justify-content-end mt-4">
    <button className="btnCloseCarnet"  onClick={closeCarnet}>Cerrar</button>
</div>

    </div>
  );
}
