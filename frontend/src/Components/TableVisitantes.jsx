import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";

import TablaVisitantesDesactivados from "./TableVisitantantesDesactivados";
import FormVisitante from "./Form/FormVisitante";
import FormPerfil from "./Form/FomPerfiles/FormPerfil";
import "../styles/Table.css";

const fetchVisitantes = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/usuarios/visitantes",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    // 1. Verificar si la respuesta es OK (status 200)
    if (!response.ok) {
      // Manejo de errores HTTP (ej: 404, 500)
      console.error(
        "Error en la respuesta del servidor:",
        response.status,
        response.statusText
      );
      return []; // Devolvemos array vacío en caso de error HTTP
    }

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    // 2. Manejo flexible de la respuesta del backend (Optimización/Good Practice)

    // Si 'data' es directamente el array de usuarios (patrón común)
    if (Array.isArray(data)) {
      console.log("El backend devolvió directamente un array.");
      return data;
    }

    // Si 'data' es un objeto que contiene la clave 'usuarios' (tu patrón original)
    if (data && Array.isArray(data.usuarios)) {
      console.log("El backend devolvió un objeto con la clave 'usuarios'.");
      return data.usuarios;
    }

    // Si no es ninguno de los formatos esperados, generamos el error, pero el catch lo manejará
    throw new Error(
      "Respuesta inesperada del backend: No se encontró un array de visitantes."
    );
  } catch (error) {
    console.error("Error al obtener visitantes:", error);
    // Aseguramos que siempre devolvemos un array vacío para no romper la UI
    return [];
  }
};

export default function TablaVisitantes() {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);

  useEffect(() => {
    cargarVisitantes();
  }, []);

  const cargarVisitantes = async () => {
    const data = await fetchVisitantes();
    setVisitantes(data);
  };

  const estadoTemplate = (rowData) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "activo" ? "success" : "danger"}
    />
  );

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
                    top: "45%",
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
                <button
                  className="btnAgregarVisitante btnVisitantesActivos  d-flex align-items-center gap-2"
                  onClick={() => setMostrarModalAgregar(true)}
                >
                  <i
                    className="pi pi-user-plus"
                    style={{ fontSize: "1.2rem", color: "#28a745" }}
                  />
                </button>

                <button
                  className="btnVerInactivos  btnVisitantesActivos d-flex align-items-center gap-2"
                  onClick={() => setMostrarModal(true)}
                >
                  <i
                    className="pi pi-users"
                    style={{ fontSize: "1.2rem", color: "#e1a626ff" }}
                  />
                </button>
                <button
                  className="btnActions btn-crear-perfil d-flex align-items-center gap-2"
                  onClick={() => setMostrarModalPerfil(true)}
                >
                  <i
                    className="pi pi-id-card"
                    style={{ color: "#17a2b8", fontSize: "1.4rem" }}
                  />
                </button>
                <Tooltip
                  target=".btnAgregarVisitante"
                  content="Agregar visitante"
                  position="top"
                />
                <Tooltip
                  target=".btnVerInactivos"
                  content="Ver visitantes inactivos"
                  position="top"
                />
                <Tooltip
                  target=".btn-crear-perfil"
                  content="Crear perfil"
                  position="top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const visitantesFiltrados = visitantes.filter((v) =>
    [v.nombre, v.apellido, v.estado]
      .map((campo) => campo?.toLowerCase() || "")
      .some((valor) => valor.includes(filtroGlobal.toLowerCase()))
  );

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
      {/* 🛑 Modal de Visitantes Desactivados */}
      <Dialog
        header="Visitantes desactivados"
        visible={mostrarModal}
        style={{ width: "800px" }}
        onHide={() => setMostrarModal(false)}
        modal
      >
        <TablaVisitantesDesactivados onClose={() => setMostrarModal(false)} />
      </Dialog>

      {/* ➕ Modal de Agregar Visitante */}
      <Dialog
        header="Agregar visitante"
        visible={mostrarModalAgregar}
        style={{ width: "800px" }}
        onHide={() => setMostrarModalAgregar(false)}
        modal
      >
        <FormVisitante closeModal={() => setMostrarModalAgregar(false)} />
      </Dialog>

      {/* 💳 Nuevo Modal de Crear Perfil */}
      <Dialog
        header="Crear Perfil"
        visible={mostrarModalPerfil}
        style={{ width: "430px" }}
        onHide={() => setMostrarModalPerfil(false)}
        modal
      >
        {/* Usamos el componente FormPerfil dentro del Dialog */}
        <FormPerfil closeModal={() => setMostrarModalPerfil(false)} />
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
