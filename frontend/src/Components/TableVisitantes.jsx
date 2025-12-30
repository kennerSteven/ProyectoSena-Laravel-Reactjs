import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import TablaVisitantesDesactivados from "./TableVisitantantesDesactivados";

// 🔒 Fetch blindado institucionalizado
const fetchVisitantes = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/usuario/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success || !Array.isArray(data.data)) {
      throw new Error(data.message || "Respuesta inesperada del backend");
    }

    return data.data;
  } catch (error) {
    console.error("Error al obtener visitantes:", error);
    return []; // Fallback institucional
  }
};

export default function TablaVisitantes() {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarVisitantes = async () => {
    const data = await fetchVisitantes();
    setVisitantes(data);
  };

  useEffect(() => {
    cargarVisitantes();
  }, []);

  const estadoTemplate = (rowData) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "activo" ? "success" : "danger"}
    />
  );

  const fechaTemplate = (rowData) => {
    const fecha = new Date(rowData.fechaIngreso);
    return fecha.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const header = (
    <div>
      <div className="mb-3">
        <h2 className="fw-bold d-flex gap-2">Visitantes</h2>
      </div>

      <div className="d-flex justify-content-between headerContainer align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <div className="d-flex align-items-center">
            <div className="d-flex justify-content-between align-items-center px-3 pt-3 mb-3">
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
            </div>
            <div>
              <Button
                label="Visitantes inactivos"
                className="p-button-sm rounded"
                onClick={() => setMostrarModal(true)}
              />
            </div>
          </div>
        </div>

        <Tooltip
          target=".btn-crear-instructor"
          content="Visitantes inactivos"
          position="top"
        />
      </div>
    </div>
  );

  const visitantesFiltrados = visitantes.filter(
    (v) =>
      v.nombre?.toLowerCase().includes(filtroGlobal.toLowerCase()) ||
      v.apellido?.toLowerCase().includes(filtroGlobal.toLowerCase()) ||
      v.estado?.toLowerCase().includes(filtroGlobal.toLowerCase())
  );

  return (
    <div className="card mx-auto shadow mt-4" style={{ width: "1000px" }}>
      <Dialog
        header="Formulario de visitante"
        visible={mostrarModal}
        style={{ width: "800px" }}
        onHide={() => setMostrarModal(false)}
        modal
      >
        <TablaVisitantesDesactivados onClose={() => setMostrarModal(false)} />
      </Dialog>

      <DataTable
        value={visitantesFiltrados}
        paginator
        rows={5}
        header={header}
        rowsPerPageOptions={[5, 10, 20]}
        dataKey="id"
        emptyMessage="No hay visitantes registrados."
      >
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="fechaIngreso" header="Fecha de ingreso" body={fechaTemplate} />
        <Column field="estado" header="Estado" body={estadoTemplate} />
      </DataTable>
    </div>
  );
}