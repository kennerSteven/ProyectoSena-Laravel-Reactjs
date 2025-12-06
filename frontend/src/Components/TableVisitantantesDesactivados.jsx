import { useState, useEffect, useRef } from "react";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import "../styles/Table.css";

export default function TableVisitantesDesactivados() {
  const [visitantes, setVisitantes] = useState([]);
  const [filtroGlobal, setFiltroGlobal] = useState("");
  // const [seleccionados, setSeleccionados] = useState([]);
  const toast = useRef(null);

  const cargarVisitantes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/visitantes/desactivados"
      );
      if (!response.ok) throw new Error("Error al obtener visitantes");

      const data = await response.json();
      const usuarios = Array.isArray(data.usuarios) ? data.usuarios : [];
      const inactivos = usuarios.filter(
        (v) => v.estado?.toLowerCase() === "inactivo"
      );
      setVisitantes(inactivos);
    } catch (error) {
      console.error("Error al cargar visitantes:", error);
    }
  };

  useEffect(() => {
    cargarVisitantes();
  }, []);

  // const eliminarVisitantes = async (ids) => {
  //   const response = await fetch(
  //     "http://localhost:8000/api/usuario/eliminarVisitantesMasivamente",
  //     {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ids }),
  //     }
  //   );

  //   const text = await response.text();
  //   let result;

  //   try {
  //     result = JSON.parse(text);
  //   } catch {
  //     throw new Error("Respuesta inválida del servidor.");
  //   }

  //   if (!response.ok) {
  //     throw new Error(result?.error || "No se pudo eliminar los visitantes.");
  //   }

  //   return result;
  // };

  // const confirmarEliminacion = (ids) => {
  //   confirmDialog({
  //     message: `¿Seguro que deseas eliminar ${ids.length} visitante(s)?`,
  //     header: "Confirmar eliminación",
  //     icon: "pi pi-exclamation-triangle",
  //     acceptLabel: "Sí",
  //     rejectLabel: "No",
  //     acceptClassName: "p-button-danger",
  //     accept: async () => {
  //       try {
  //         const result = await eliminarVisitantes(ids);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Visitantes eliminados",
  //           text: `${result.total_eliminados} visitante(s) eliminado(s) correctamente`,
  //           confirmButtonText: "Aceptar",
  //           timer: 2000,
  //           timerProgressBar: true,
  //           showConfirmButton: true,
  //           customClass: {
  //             confirmButton: "buttonConfirmSwal",
  //           },
  //         });
  //         setSeleccionados([]);
  //         await cargarVisitantes();
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error al eliminar",
  //           text: `No se pudo eliminar los visitantes seleccionados. ${error.message}`,
  //           confirmButtonText: "Aceptar",
  //           timer: 3000,
  //           timerProgressBar: true,
  //           showConfirmButton: true,
  //           customClass: {
  //             confirmButton: "buttonConfirmSwal",
  //           },
  //         });
  //       }
  //     },
  //   });
  // };

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

  const estadoTemplate = (rowData) => (
    <Tag value={rowData.estado} severity="danger" />
  );

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

      {/* <Button
        label="Eliminar seleccionados"
        icon="pi pi-trash"
        severity="danger"
        disabled={seleccionados.length === 0}
        onClick={() => confirmarEliminacion(seleccionados.map((v) => v.id))}
      /> */}
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      {/* <ConfirmDialog /> */}
      <DataTable
        value={filtrarVisitantes}
        paginator
        rows={5}
        header={header}
        rowsPerPageOptions={[5, 10, 20]}
        emptyMessage="No hay visitantes inactivos registrados."

        // onSelectionChange={(e) => setSeleccionados(e.value)}
      >
        {/* <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} /> */}
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="numeroDocumento" header="Número de Documento" />
        <Column field="fechaRegistro" header="Fecha de registro" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
      </DataTable>
    </div>
  );
}
