import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../../styles/ActivarInstructor.css";

export default function TablaActivarUsuarios({
  fetchUsuariosDesactivados,
  activarUsuarioPorId,
  activarUsuariosPorLote,
}) {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const data = await fetchUsuariosDesactivados();
      setUsuarios(data);
    };
    cargarUsuarios();
  }, [fetchUsuariosDesactivados]);

  const activarUsuario = async (id) => {
    await activarUsuarioPorId(id);
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, estado: "activo" } : u))
    );
  };

  const activarSeleccionados = async () => {
    const ids = seleccionados.map((u) => u.id);
    await activarUsuariosPorLote(ids); 
    setUsuarios((prev) =>
      prev.map((u) =>
        ids.includes(u.id) ? { ...u, estado: "activo" } : u
      )
    );
    setSeleccionados([]);
  };

  const confirmarActivacion = (id = null) => {
    confirmDialog({
      message: `¿Activar ${id ? "este usuario" : "los usuarios seleccionados"}?`,
      header: "Confirmar activación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "buttnAceptar",
      acceptLabel: "Sí, activar",
      rejectLabel: "Cancelar",
      accept: () => {
        id ? activarUsuario(id) : activarSeleccionados();
      },
    });
  };

  const estadoTemplate = (rowData) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "activo" ? "success" : "danger"}
    />
  );

  const accionesTemplate = (rowData) => (
    <Button
      icon="pi pi-check"
      className="btnActivar"
      disabled={rowData.estado === "activo"}
      onClick={() => confirmarActivacion(rowData.id)}
    />
  );

  return (
    <div className="card">
      <ConfirmDialog />

      <div className="d-flex justify-content-end align-items-center px-3 pt-3 mb-3">
        <Button
          label="Activar seleccionados"
          icon="pi pi-check"
          className="btnActivarTodos"
          disabled={seleccionados.length === 0}
          onClick={() => confirmarActivacion()}
        />
      </div>

      <DataTable
        value={usuarios}
        selection={seleccionados}
        onSelectionChange={(e) => setSeleccionados(e.value)}
        dataKey="id"
        paginator
        rows={5}
        scrollHeight="280px"
        rowsPerPageOptions={[5, 10, 20]}
        emptyMessage="No hay usuarios desactivados."
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="numeroDocumento" header="Número de documento" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
        <Column header="Acciones" body={accionesTemplate} style={{ width: "6rem" }} />
      </DataTable>
    </div>
  );
}