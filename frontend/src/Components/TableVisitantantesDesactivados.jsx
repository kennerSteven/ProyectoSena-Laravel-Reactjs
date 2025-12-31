import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";

export default function TablaVisitantesDesactivados({
  fetchVisitantes,
  eliminarVisitantes,
}) {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const toast = useRef(null);

  const cargarVisitantes = async () => {
    try {
      const data = await fetchVisitantes();
      setVisitantes(data);
    } catch (error) {
      console.error("Error al cargar visitantes:", error);
    }
  };

  useEffect(() => {
    cargarVisitantes();
  }, [fetchVisitantes]);

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

  const filtrarVisitantes = visitantes.filter((v) => {
    const texto = filtroGlobal.toLowerCase();
    return (
      v.nombre?.toLowerCase().includes(texto) ||
      v.apellido?.toLowerCase().includes(texto) ||
      v.estado?.toLowerCase().includes(texto) ||
      new Date(v.fechaIngreso)
        .toLocaleDateString("es-CO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .toLowerCase()
        .includes(texto)
    );
  });

  const confirmarEliminacion = (ids) => {
    confirmDialog({
      message: `¿Eliminar ${ids.length} visitante(s)?`,
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          await eliminarVisitantes(ids);
          toast.current.show({
            severity: "success",
            summary: "Eliminado",
            detail: "Visitante(s) eliminado(s)",
            life: 3000,
          });
          cargarVisitantes();
          setSeleccionados([]);
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo eliminar",
            error,
            life: 3000,
          });
        }
      },
    });
  };

  const header = (
    <div className="d-flex justify-content-between align-items-center">
      <div style={{ position: "relative", width: "300px" }}>
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

      <Button
        label="Eliminar seleccionados"
        icon="pi pi-trash"
        severity="danger"
        disabled={seleccionados.length === 0}
        onClick={() => confirmarEliminacion(seleccionados.map((v) => v.id))}
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={filtrarVisitantes}
        paginator
        rows={5}
        header={header}
        rowsPerPageOptions={[5, 10, 20]}
        dataKey="id"
        emptyMessage="No hay visitantes registrados."
        selection={seleccionados}
        onSelectionChange={(e) => setSeleccionados(e.value)}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column
          field="fechaIngreso"
          header="Fecha de ingreso"
          body={fechaTemplate}
        />
        <Column field="estado" header="Estado" body={estadoTemplate} />
        <Column
          body={(rowData) => (
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              onClick={() => confirmarEliminacion([rowData.id])}
            />
          )}
          headerStyle={{ width: "4rem" }}
        />
      </DataTable>
    </div>
  );
}
