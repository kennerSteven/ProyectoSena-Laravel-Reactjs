import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import FormPerfil from "../../Form/FomPerfiles/FormPerfil";

// Configuración Base
const BASE_URL = "http://localhost:8000/api";

// --- Estilos Específicos para Botones de Acción ---
const customButtonStyle = {
  border: "none",
  padding: "12px 30px",
  fontWeight: 600,
  borderRadius: "12px",
  fontSize: "15px",
  background: "#e6f4ea",
  color: "#2e7d32",
};

// ----------------------------------------------------------------------
// --- 1.1. Componente del Modal de Creación (Llama a FormPerfil) ---
// ----------------------------------------------------------------------

const CreateModal = ({ visible, onClose, onProfileCreated }) => {
  // El footer solo contiene el botón de Cancelar, ya que el botón de Guardar está dentro del FormPerfil
  const footerContent = (
    <div className="p-d-flex p-jc-end">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onClose}
        className="p-button-secondary p-button-sm"
      />
    </div>
  );

  return (
    <Dialog
      header="Crear Nuevo Perfil"
      visible={visible}
      style={{ width: "30vw" }} // Ancho ajustado para centrar el formulario
      modal
      onHide={onClose}
      footer={footerContent}
    >
      {/* FormPerfil recibe el callback de creación y la función de cierre */}
      <FormPerfil onProfileCreated={onProfileCreated} onCloseModal={onClose} />
    </Dialog>
  );
};

// ----------------------------------------------------------------------
// --- 1.2. Componente del Modal de Edición (PrimeReact Dialog) ---
// ----------------------------------------------------------------------

const EditModal = ({ visible, perfil, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({});

  useEffect(() => {
    if (perfil) {
      reset({
        nombre: perfil.nombre,
        descripcion: perfil.descripcion,
      });
    }
  }, [perfil, reset]);

  const handleUpdate = async (data) => {
    if (!perfil) return;

    try {
      const response = await fetch(`${BASE_URL}/perfiles/update/${perfil.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la actualización del servidor.");
      }

      const updatedPerfil = await response.json();

      // 🚨 Estilos Swal Fire para botón de confirmación
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: `El perfil  ha sido actualizado correctamente.`,
        confirmButtonText: "Aceptar",
        timer: 3000,
        customClass: {
          confirmButton: "swal-custom-button",
        },
        buttonsStyling: false,
      });

      // Inyección de estilos en Swal para la clase 'swal-custom-button'
      const styleElement = document.createElement("style");
      styleElement.innerHTML = `.swal-custom-button { 
                ${Object.entries(customButtonStyle)
                  .map(([key, value]) => `${key}: ${value};`)
                  .join(" ")}
            }`;
      document.head.appendChild(styleElement);

      onUpdate(updatedPerfil);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil.", { duration: 5000 });
    }
  };

  const footerContent = (
    <div className="p-d-flex p-jc-end p-gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onClose}
        className="buttonCancelLogout p-button-secondary"
        disabled={isSubmitting}
      />
      <Button
        label={isSubmitting ? "Guardando..." : "Guardar Cambios"}
        icon="pi pi-check"
        type="submit"
        form="edit-form"
        style={customButtonStyle} // 🚨 Aplicando estilo personalizado aquí
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <Dialog
      header={`Actualizar Perfil: ${perfil?.nombre || ""}`}
      visible={visible}
      style={{ width: "30vw" }}
      modal
      onHide={onClose}
      footer={footerContent}
    >
      <form
        id="edit-form"
        onSubmit={handleSubmit(handleUpdate)}
        className="p-fluid"
      >
        <div className="p-field p-mb-3">
          <label htmlFor="edit-nombre" className="p-d-block">
            Nombre:
          </label>
          <div className="py-3">
            <InputText
              id="edit-nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className={errors.nombre ? "p-invalid" : ""}
            />
          </div>
          {errors.nombre && (
            <small className="p-error">{errors.nombre.message}</small>
          )}
        </div>

        <div className="p-field p-mb-3">
          <label htmlFor="edit-descripcion" className="p-d-block">
            Descripción:
          </label>
          <InputText
            id="edit-descripcion"
            {...register("descripcion", {
              required: "La descripción es obligatoria",
            })}
            className={errors.descripcion ? "p-invalid" : ""}
          />
          {errors.descripcion && (
            <small className="p-error">{errors.descripcion.message}</small>
          )}
        </div>
      </form>
    </Dialog>
  );
};

// ----------------------------------------------------------------------
// --- 2. Componente Principal: PerfilesView ---
// ----------------------------------------------------------------------

export const PerfilesView = () => {
  const [perfiles, setPerfiles] = useState([]);

  const [perfilToEdit, setPerfilToEdit] = useState(null);
  const [openFichaModal, setOpenFichaModal] = useState(false);
  false;

  // Opciones de paginación solicitadas
  const rowsPerPageOptions = [10, 15, 20];

  // --- Lógica de Fetching (GET) ---
  const fetchPerfiles = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/perfiles/index`);
      if (!response.ok) {
        throw new Error("Fallo al cargar perfiles.");
      }
      const data = await response.json();
      setPerfiles(data);
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
      toast.error("Error al cargar la lista de perfiles.", { duration: 5000 });
    }
  }, []);

  useEffect(() => {
    fetchPerfiles();
  }, [fetchPerfiles]);

  // --- Lógica de Edición y Modal ---
  const openEditModal = (perfil) => setPerfilToEdit(perfil);
  const closeEditModal = () => setPerfilToEdit(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const handlePerfilUpdate = (updatedPerfil) => {
    setPerfiles((prev) =>
      prev.map((p) => (p.id === updatedPerfil.id ? updatedPerfil : p))
    );
  };

  // Renderización de la columna de Acciones para la DataTable
  const actionBodyTemplate = (perfil) => {
    return (
      <Button
        icon="pi pi-pencil"
        label="Editar"
        className="ActualizarFicha p-button-sm p-button-warning"
        onClick={() => openEditModal(perfil)}
      />
    );
  };

  return (
    <div className="p-grid p-justify-center p-m-4">
      <Toaster position="top-right" />

      {/* Contenedor Principal de la Vista */}
      <div
        className="p-col-12 p-shadow-2 p-p-4"
        style={{
          borderRadius: "10px",
          marginTop: "50px",
          maxWidth: "1200px",
          margin: "50px auto", // Centrar el contenedor
        }}
      >
        <div
          className="card p-datatable-gridlines p-shadow-3"
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            padding: "15px",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3">
            <h3 className="p-m-0">Lista de Perfiles ({perfiles.length})</h3>
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
              style={{
                paddingLeft: "2rem",
                width: "250px",
              }}
            />
            <Button
              label="Crear Nuevo Perfil"
              icon="pi pi-plus"
              className="btnCreatePerfil p-button-success"
              onClick={setOpenFichaModal}
            />
          </div>

          {/* DataTable con Scroll y Paginación configurada */}
          <DataTable
            globalFilter={globalFilter}
            value={perfiles}
            emptyMessage="No se encontraron perfiles."
            dataKey="id"
            // 🚨 Configuración de Paginación Avanzada
            paginator
            rows={rowsPerPageOptions[0]} // Fila inicial
            rowsPerPageOptions={rowsPerPageOptions} // Opciones de Paginación
            // 🚨 Configuración de Scroll
            scrollable
            scrollHeight="400px"
            sortMode="multiple"
          >
            <Column
              field="nombre"
              header="Nombre del Perfil"
              sortable
              style={{ width: "35%", padding: "15px" }}
            />
            <Column
              field="descripcion"
              header="Descripción"
              sortable
              style={{ width: "45%", padding: "15px" }}
            />
            <Column
              header="Acciones"
              body={actionBodyTemplate}
              style={{ width: "20%", textAlign: "center", padding: "15px" }}
            />
          </DataTable>
        </div>
      </div>
      <Dialog
        header="Crear Ficha"
        visible={openFichaModal}
        style={{ width: "450px" }}
        onHide={() => setOpenFichaModal(false)}
        modal
      >
        {" "}
        <FormPerfil
          closeModal={() => {
            setOpenFichaModal(false);
          }}
        />
      </Dialog>

      {/* Modal de Edición */}
      <EditModal
        visible={!!perfilToEdit}
        perfil={perfilToEdit}
        onClose={closeEditModal}
        onUpdate={handlePerfilUpdate}
      />
    </div>
  );
};
