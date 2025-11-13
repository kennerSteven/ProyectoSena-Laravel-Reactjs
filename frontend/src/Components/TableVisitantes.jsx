import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import TablaVisitantesDesactivados from "./TableVisitantantesDesactivados";
import FormVisitante from "./Form/FormVisitante";
import "../styles/Table.css";

// 🔄 API: Obtener visitantes
const fetchVisitantes = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/usuarios/visitantes",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    if (!Array.isArray(data.usuarios)) {
      throw new Error(
        "Respuesta inesperada del backend: 'usuarios' no es un array"
      );
    }

    return data.usuarios;
  } catch (error) {
    console.error("Error al obtener visitantes:", error);
    return [];
  }
};

export default function TablaVisitantes() {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);

  useEffect(() => {
    cargarVisitantes();
  }, []);

  const cargarVisitantes = async () => {
    const data = await fetchVisitantes();
    setVisitantes(data);
  };

  // 🏷️ Template para estado
  const estadoTemplate = (rowData) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "activo" ? "success" : "danger"}
    />
  );

  // 🔍 Header con búsqueda y botones
  const header = (
    <div>
      <h2 className="fw-bold d-flex gap-2">Visitantes</h2>
      <div className="d-flex justify-content-between headerContainer align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-center">
              <div style={{ position: "relative", width: "100%" }}>
                <i
                  className="pi pi-search"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                    fontSize: "1rem",
                    pointerEvents: "none",
                  }}
                />
                <InputText
                  value={filtroGlobal}
                  onChange={(e) => setFiltroGlobal(e.target.value)}
                  placeholder="Buscar visitante"
                  className="p-inputtext-sm"
                  style={{ paddingLeft: "2rem", width: "100%" }}
                />
              </div>
              <div className="d-flex align-items-center ms-3 gap-2">
                <Button
                  className="addVisitante"
                  icon="pi pi-plus"
                  onClick={() => setMostrarModalAgregar(true)}
                />
                <Button
                  className="btnVisitantesActivos"
                  icon="pi pi-user-minus text-warning"
                  iconPos="left"
                  onClick={() => setMostrarModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <Tooltip
          target=".btnVisitantesActivos"
          content="Visitantes inactivos"
          position="top"
        />
      </div>
    </div>
  );

  // 🔎 Filtro global
  const visitantesFiltrados = visitantes.filter((v) =>
    [v.nombre, v.apellido, v.estado]
      .map((campo) => campo?.toLowerCase() || "")
      .some((valor) => valor.includes(filtroGlobal.toLowerCase()))
  );

  // 🖼️ Template para foto
  const fotoTemplate = (rowData) => {
    const ruta = rowData.foto;
    let url = null;

    if (ruta?.startsWith("storage/")) {
      url = `http://localhost:8000/${ruta}`;
    } else if (ruta?.startsWith("http")) {
      url = ruta;
    }

    return url ? (
      <img
        src={url}
        alt="Foto"
        className="img-thumbnail"
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    ) : (
      <span className="text-muted">—</span>
    );
  };

  return (
    <div
      className="card mx-auto shadow mt-4 tableContainer"
      style={{ width: "1000px" }}
    >
      {/* 🧾 Modal visitantes desactivados */}
      <Dialog
        header="Visitantes desactivados"
        visible={mostrarModal}
        style={{ width: "800px" }}
        onHide={() => setMostrarModal(false)}
        modal
      >
        <TablaVisitantesDesactivados onClose={() => setMostrarModal(false)} />
      </Dialog>

      {/* ➕ Modal agregar visitante */}
      <Dialog
        header="Agregar visitante"
        visible={mostrarModalAgregar}
        style={{ width: "800px" }}
        onHide={() => setMostrarModalAgregar(false)}
        modal
      >
        <FormVisitante onClose={() => setMostrarModalAgregar(false)} />
      </Dialog>

      {/* 📋 Tabla principal */}
      <DataTable
        value={visitantesFiltrados}
        paginator
        scrollHeight="260px"
        rows={5}
        header={header}
        rowsPerPageOptions={[5, 10, 20]}
        dataKey="id"
        emptyMessage="No hay visitantes registrados."
      >
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="numeroDocumento" header="Número de documento" />
        <Column header="Foto" body={fotoTemplate} />
        <Column field="fechaRegistro" header="Fecha de ingreso" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
      </DataTable>
    </div>
  );
}
