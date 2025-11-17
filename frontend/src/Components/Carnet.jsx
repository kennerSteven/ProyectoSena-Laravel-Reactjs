import logoSena from "../assets/img/logoSena.png";
import defaultUser from "../assets/img/iconUser.png";
import "../styles/Carnet.css";

export default function Carnet({
  nombre,
  tipoDoc,
  numeroDoc,
  sangre,
  telefono,
  tipoPerfil,
  apellido,
  foto,
  closeCarnet,
  Formacion,
  ficha,
}) {
  const urlFoto = foto?.startsWith("http")
    ? foto
    : foto
    ? `http://localhost:8000/${foto}`
    : defaultUser;

  const mostrarFicha =
    Formacion?.toLowerCase() === "aprendiz" && ficha ? ` ${ficha}` : null;

  return (
    <div className="containerC">
      <div className="containerCarnet">
        <div className="d-flex justify-content-between px-3 pt-3 pb-4">
          <div className="mt-2">
            <img src={logoSena} alt="Logo SENA" style={{ width: "80px" }} />
          </div>

          <div className="d-flex align-items-end gap-2 mt-2">
            <small className="fw-bold">{tipoPerfil}</small>
            <img
              src={urlFoto}
              alt="Foto"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid #ccc",
              }}
            />
          </div>
        </div>

        <hr className="SeparatorCarnet" />

        <div className="infoCarnet px-3 py-4">
          <strong className="strong1 mb-4">
            {nombre} {apellido}
          </strong>

          <div className="d-flex flex-column mt-2 ">
            <p className="normalText">
              {tipoDoc}: {numeroDoc}
            </p>
            <p className="normalText">Grupo sanguíneo: {sangre}</p>
            <p className="normalText">Teléfono: {telefono}</p>
          </div>

          <div className="d-flex flex-column mt-3">
            <hr />
            <div className="d-flex flex-column gap-1">
              <small className="normalText">Regional Santander</small>
              {mostrarFicha && (
                <strong className="strong2">{mostrarFicha}</strong>
              )}
              <p className=" normalText text-success ">
                Centro Agroempresarial y Turístico de los Andes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btnCloseCarnet" onClick={closeCarnet}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
