import { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
// Importar SweetAlert2
import Swal from "sweetalert2";

import "../../styles/ActivarInstructor.css";

export default function TablaActivarUsuarios({
  fetchUsuariosDesactivados,

  activarUsuariosPorLote,
}) {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  // Eliminamos confirmTargetId ya que solo haremos activación por lote
  const [globalFilter, setGlobalFilter] = useState("");

  // Memoización de la función de carga
  const cargarUsuarios = useCallback(async () => {
    try {
      const data = await fetchUsuariosDesactivados();
      setUsuarios(data);
    } catch (error) {
      // Manejo de error al cargar la lista inicial
      mostrarAlertaError(
        "No se pudieron cargar los usuarios desactivados. Intenta de nuevo más tarde."
      );
      console.error("Error al cargar usuarios:", error);
    }
  }, [fetchUsuariosDesactivados]);

  // Hook useEffect para la carga inicial de usuarios.
  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  // 1. CAMBIO: Función para mostrar la alerta de éxito con SweetAlert2 (Centrada).
  const mostrarAlertaExito = () => {
    Swal.fire({
      icon: "success",
      title: "Instructor activado",
      text: "El instructor fue activado exitosamente",
      confirmButtonText: "Aceptar",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
      customClass: {
        confirmButton: "buttonConfirmSwal",
      },
    });
  };

  // Función para mostrar la alerta de error con SweetAlert2. (Se mantiene centrada)
  const mostrarAlertaError = (mensaje) => {
    Swal.fire({
      icon: "error",
      title: "Error de Activación",
      text: mensaje,
      showConfirmButton: true,
    });
  };

  // 💡 NOTA: Se elimina la función `activarUsuario` (individual)
  // ya que eliminamos el botón de la fila, forzando la activación por lote.

  // **Activación por Lote** con manejo de errores (El único método de acción)
  const activarSeleccionados = async () => {
    const ids = seleccionados.map((u) => u.id);

    // Si no hay seleccionados, salimos.
    if (ids.length === 0) return;

    try {
      // Llama a la función de la prop para activar en el backend.
      await activarUsuariosPorLote(ids);

      // Si la promesa es exitosa:
      await cargarUsuarios();
      setSeleccionados([]);
      // Muestra la alerta de éxito centrada
      mostrarAlertaExito(
        `¡Se han activado ${ids.length} usuarios seleccionados!`
      );
    } catch (error) {
      // Si la promesa falla:
      console.error("Error activando usuarios por lote:", error);
      mostrarAlertaError(
        `Ocurrió un error al activar ${ids.length} usuarios. Intenta de nuevo.`
      );
    }
  };

  // Función para mostrar el diálogo de confirmación de PrimeReact.
  // Ahora solo maneja la activación por lote (confirmTargetId ya no existe en el estado)
  const confirmarActivacion = () => {
    setConfirmVisible(true);
  };

  // Función que se ejecuta al aceptar en el ConfirmDialog.
  const aceptarActivacion = async () => {
    setConfirmVisible(false);
    // Solo se llama a la función de lote.
    await activarSeleccionados();
  };

  // Template para la columna de estado
  const estadoTemplate = (rowData) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "activo" ? "success" : "danger"}
    />
  );

  // Lógica de filtrado (Sin cambios)
  const camposFiltrables = ["nombre", "apellido", "numeroDocumento"];

  const usuariosFiltrados = usuarios.filter((item) => {
    const texto = globalFilter.trim().toLowerCase();
    return camposFiltrables.some((campo) =>
      item[campo]?.toString().toLowerCase().includes(texto)
    );
  });

  // 2. CAMBIO: Se elimina el `accionesTemplate` y no se usa.

  return (
    <div className="card">
      {/* ConfirmDialog de PrimeReact */}
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        // El mensaje ahora siempre es para los seleccionados.
        message={`¿Activar los ${seleccionados.length} usuarios seleccionados?`}
        header="Confirmar activación por lote"
        icon="pi pi-exclamation-triangle"
        acceptClassName="buttnAceptar"
        acceptLabel="Sí, activar"
        rejectLabel="Cancelar"
        accept={aceptarActivacion} // Llama a la lógica de lote
        reject={() => setConfirmVisible(false)}
      />

      <div className="d-flex justify-content-between align-items-center px-3 pt-3 mb-3">
        {/* InputText para el Filtro Global */}
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar usuarios..."
          style={{ paddingLeft: "2rem", width: "250px" }}
        />

        {/* Botón para la Activación por Lote */}
        <Button
          label={`Activar (${seleccionados.length})`}
          icon="pi pi-check"
          className="btnActivarTodos"
          disabled={seleccionados.length === 0}
          // Llama a confirmarActivacion sin ID
          onClick={confirmarActivacion}
        />
      </div>

      {/* DataTable de PrimeReact */}
      <DataTable
        value={usuariosFiltrados}
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
        <Column field="numeroDocumento" header="Documento" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
        {/* 3. CAMBIO: Se ELIMINA la Columna de Acción Individual.
        <Column header="Acción" body={accionesTemplate} style={{ width: "6rem" }} /> */}
      </DataTable>
    </div>
  );
}
