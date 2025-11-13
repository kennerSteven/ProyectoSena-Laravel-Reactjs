import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import "../styles/Table.css";

export default function TableVisitantesDesactivados() {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const toast = useRef(null);

  // 🔄 Cargar visitantes inactivos
  const cargarVisitantes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/visitantes/desactivados"
      );

      if (!response.ok) {
        throw new Error("Error al obtener visitantes");
      }

      const data = await response.json();
      const usuarios = Array.isArray(data.usuarios) ? data.usuarios : [];
      const inactivos = usuarios.filter(
        (v) => v.estado?.toLowerCase() === "inactivo"
      );
      setVisitantes(inactivos);
    } catch (error) {
      console.error("Error al cargar visitantes:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cargar la lista de visitantes",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    cargarVisitantes();
  }, []);

  // 🗑️ Eliminar visitantes
  const eliminarVisitantes = async (ids) => {
    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Debe proporcionar un array de IDs para eliminar.");
      }

      const response = await fetch(
        "http://localhost:8000/api/usuario/eliminarVisitantesMasivamente",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }), // Laravel lo leerá con getContent()
        }
      );

      const text = await response.text(); // 🔍 Leer como texto primero
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Respuesta inválida del servidor.");
      }

      if (!response.ok) {
        throw new Error(result?.error || "No se pudo eliminar los visitantes.");
      }

      return result;
    } catch (error) {
      console.error("Error al eliminar visitantes:", error);
      throw error;
    }
  };

  // ✅ Confirmar eliminación
  const confirmarEliminacion = (ids) => {
    confirmDialog({
      message: `¿Seguro que deseas eliminar ${ids.length} visitante(s)?`,
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          const result = await eliminarVisitantes(ids);
          toast.current?.show({
            severity: "success",
            summary: "Eliminado",
            detail: `${result.total_eliminados} visitante(s) eliminado(s) correctamente`,
            life: 3000,
          });
          setSeleccionados([]);
          await cargarVisitantes();
        } catch (error) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: error.message || "Error al eliminar visitantes",
            life: 3000,
          });
        }
      },
    });
  };

  // 🔍 Filtro global
  const filtrarVisitantes = visitantes.filter((v) => {
    const texto = filtroGlobal.toLowerCase();
    const fecha = new Date(v.fechaIngreso).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      v.nombre?.toLowerCase().includes(texto) ||
      v.apellido?.toLowerCase().includes(texto) ||
      fecha.toLowerCase().includes(texto)
    );
  });

  // 🏷️ Templates
  const estadoTemplate = (rowData) => (
    <Tag value={rowData.estado} severity="danger" />
  );
  const fechaTemplate = (rowData) => {
    const fecha = new Date(rowData.fechaIngreso);
    return fecha.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 🧭 Header
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
      <ConfirmDialog />
      <DataTable
        value={filtrarVisitantes}
        paginator
        rows={5}
        header={header}
        rowsPerPageOptions={[5, 10, 20]}
        dataKey="id"
        emptyMessage="No hay visitantes inactivos registrados."
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
      </DataTable>
    </div>
  );
}
