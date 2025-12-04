import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import {
  getFichasDesactivadas,
  deleteFicha,
  deleteFichasMasivo,
  getUsuariosDeFicha,
} from "../Services/FetchServices";
import "../../styles/TableFichasDesactivadas.css";
import Swal from "sweetalert2";

// 🔑 URL BASE DE TU API (Asumo que la tienes definida en algún lugar)
const API_URL = "http://localhost:8000/api"; // ⚠️ Ajusta esto a la URL base real de tu API de Laravel

export default function TablaFichasDesactivadas() {
  const [fichas, setFichas] = useState([]);
  const [filteredFichas, setFilteredFichas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [usuariosFicha, setUsuariosFicha] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const toast = useRef(null);

  const cargarFichas = async () => {
    const response = await getFichasDesactivadas();
    const data = Array.isArray(response.fichas) ? response.fichas : [];
    setFichas(data);
    setFilteredFichas(data);
  };

  useEffect(() => {
    cargarFichas();
  }, []);

  // ----------------------------------------------------------------------
  // 🔑 FETCH DEFINIDO LOCALMENTE: ACTIVAR FICHA
  // ----------------------------------------------------------------------
  const activarFicha = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/fichas/${id}/activar`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (!response.ok) {
      // Manejo de errores específicos (ej. 400 ya activa, 404 no encontrada)
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          errorData.message ||
          `Error ${response.status}: Fallo la activación de la ficha.`
      );
    }

    return response.json();
  };

  // ----------------------------------------------------------------------
  // LÓGICA DE ACTIVACIÓN (Handler)
  // ----------------------------------------------------------------------
  const activarFichaHandler = async (id, numeroFicha) => {
    Swal.fire({
      title: "Activando Ficha...",
      text: `Activando ficha ${numeroFicha} y sus usuarios.`,
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await activarFicha(id); // Llamada al fetch local
      await cargarFichas(); // Recarga la tabla
      Swal.fire({
        icon: "success",
        title: "¡Ficha Activada!",
        text:
          response.message ||
          `La ficha ${numeroFicha} ha sido activada correctamente junto a sus usuarios.`,
        confirmButtonText: "Aceptar",
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
    } catch (error) {
      console.error("Error al activar ficha:", error);
      Swal.fire({
        icon: "error",
        title: "Error al Activar",
        text:
          error.message || "No se pudo activar la ficha. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const confirmarActivarFicha = (rowData) => {
    confirmDialog({
      message: `¿Estás seguro de activar la ficha ${rowData.numeroFicha} (${rowData.nombrePrograma})? Esto reactivará a todos sus aprendices asociados.`,
      header: "Confirmar Activación",

      acceptClassName: "pBtnAceptar",
      acceptLabel: "Sí, Activar Ficha",
      rejectLabel: "Cancelar",
      style: { width: "550px" },
      accept: () => activarFichaHandler(rowData.id, rowData.numeroFicha),
    });
  };

  // ----------------------------------------------------------------------
  // LÓGICA DE ELIMINACIÓN (Mantenida)
  // ----------------------------------------------------------------------
  const eliminarFicha = async (id) => {
    try {
      await deleteFicha(id);
      await cargarFichas();
      setShowDialog(false);

      Swal.fire({
        icon: "success",
        title: "Ficha eliminada ",
        text: `La ficha ${fichaSeleccionada.numeroFicha} fue eliminada correctamente.`,
        confirmButtonText: "Aceptar",
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
    } catch (error) {
      console.error("Error al eliminar ficha:", error);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: "No se pudo eliminar la ficha. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const eliminarTodasLasFichas = async () => {
    Swal.fire({
      title: "Eliminando fichas...",
      text: "Por favor, espera. Esta acción puede tardar unos segundos.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const ids = fichas.map((f) => f.id);
      if (ids.length === 0) {
        Swal.close();
        return;
      }

      await deleteFichasMasivo(ids);
      await cargarFichas();

      Swal.fire({
        icon: "success",
        title: "Fichas eliminadas",
        text: "Todas las fichas desactivadas han sido eliminadas correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });
    } catch (error) {
      console.error("Error al eliminar todas las fichas:", error);

      Swal.fire({
        icon: "error",
        title: "Error de Eliminación",
        text: `Fallo al eliminar las fichas: ${
          error.message || "Error desconocido"
        }.`,
        confirmButtonText: "Cerrar",
      });
    }
  };

  const confirmarEliminarFicha = async (id) => {
    try {
      const ficha = fichas.find((f) => f.id === id);
      const usuarios = await getUsuariosDeFicha(id);
      setUsuariosFicha(usuarios);
      setFichaSeleccionada(ficha);
      setShowDialog(true);
    } catch (error) {
      console.error("Error al obtener usuarios de la ficha:", error); // Opcional: Mostrar un toast o SweetAlert si falla la carga de usuarios
    }
  };

  const confirmarEliminarTodas = () => {
    if (fichas.length === 0) {
      toast.current.show({
        severity: "info",
        summary: "Información",
        detail: "No hay fichas para eliminar.",
        life: 3000,
      });
      return;
    }

    confirmDialog({
      message: `¿Estás seguro de eliminar todas las ${fichas.length} fichas desactivadas? Esta acción es irreversible.`,
      header: "Confirmar eliminación masiva",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar todas",
      rejectLabel: "Cancelar",
      style: { width: "550px" },
      accept: () => eliminarTodasLasFichas(),
    });
  };

  // ----------------------------------------------------------------------
  // TEMPLATES
  // ----------------------------------------------------------------------
  const estadoTemplate = (rowData) => (
    <Tag value={rowData.estado} severity="warning" />
  );

  const accionesTemplate = (rowData) => (
    <div className="d-flex gap-3">
      <Button
        icon="pi pi-trash"
        className="confirmarEliminarFicha"
        onClick={() => confirmarEliminarFicha(rowData.id)}
        tooltip="Eliminar Ficha"
        tooltipOptions={{ position: "top" }}
      />

      <Button
        icon="pi pi-check-circle"
        className="ActualizarFicha"
        onClick={() => confirmarActivarFicha(rowData)}
        tooltip="Activar ficha"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);

    const filtered = fichas.filter((f) =>
      [f.numeroFicha, f.nombrePrograma, f.jornada]
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredFichas(filtered);
  };

  const footerDialog = (
    <div className="d-flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="btnCancelar p-button-secondary"
        onClick={() => setShowDialog(false)}
      />

      <Button
        label="Eliminar ficha"
        icon="pi pi-trash"
        className="confirmarEliminarFicha"
        onClick={() => eliminarFicha(fichaSeleccionada.id)}
      />
    </div>
  );

  return (
    <div className="card p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <Dialog
        header={
          fichaSeleccionada
            ? `¿Estás seguro de eliminar la ficha ${fichaSeleccionada.numeroFicha} - ${fichaSeleccionada.nombrePrograma} con los siguientes usuarios?`
            : "¿Estás seguro de eliminar esta ficha?"
        }
        visible={showDialog}
        style={{ width: "1200px" }}
        onHide={() => setShowDialog(false)}
        footer={footerDialog}
        className="p-fluid"
      >
        <DataTable
          value={usuariosFicha}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          emptyMessage="No hay aprendices asociados. La ficha se eliminará sin afectar usuarios."
          className="p-datatable-sm"
        >
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column
            field="tipoDocumento"
            header="Tipo de Documento"
            style={{ width: "200px" }}
          />

          <Column
            field="numeroDocumento"
            header="Número de Documento"
            style={{ width: "200px" }}
          />
        </DataTable>
      </Dialog>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="flex-grow-1 me-3">
          <span className="p-input-icon-left">
            <InputText
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Buscar por código, programa o jornada..."
              className="p-inputtext-sm "
              style={{ width: "300px" }}
            />
          </span>
          =
        </div>

        <Button
          label={`Eliminar todas (${fichas.length})`}
          icon="pi pi-trash"
          className="confirmarEliminarFicha"
          onClick={confirmarEliminarTodas}
          disabled={fichas.length === 0}
          tooltip="Eliminar todas las fichas permanentemente"
          tooltipOptions={{ position: "top" }}
        />
      </div>
      <DataTable
        value={filteredFichas}
        dataKey="id"
        paginator
        rows={10}
        scrollHeight="500px"
        rowsPerPageOptions={[10, 15, 20, 50]}
        stripedRows
        showGridlines
        emptyMessage="No hay fichas desactivadas."
        className="p-datatable-sm"
      >
        <Column field="numeroFicha" header="Código" sortable />
        <Column field="nombrePrograma" header="Programa" sortable />
        <Column field="jornada" header="Jornada" sortable />
        <Column field="estado" header="Estado" body={estadoTemplate} sortable />

        <Column
          header="Acciones"
          body={accionesTemplate}
          style={{ width: "6rem", textAlign: "center" }}
        />
      </DataTable>
    </div>
  );
}
