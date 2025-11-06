import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";

import { deleteInstructor } from "../Services/FetchServices";
import SplitButtonComp from "../Ui/SplitButton";
import FormInstructor from "../Form/FormInstructor";
import FormFicha from "../Form/FormFicha"; // ✅ nuevo import
import "../../styles/Table.css";

export default function TableAprendizs({
  tableTitle,
  nameValue = [],
  dataTable = [],
  functionModal,
  openCreatePerfil,
  reloadTable,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openFichaModal, setOpenFichaModal] = useState(false); // ✅ nuevo estado
  const toast = useRef(null);

  const globalFilterFields = nameValue.map(({ field }) => field);

  const handleDeleteUser = (rowData) => {
    confirmDialog({
      message: (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "2rem", color: "#dc3545" }}
          />
          <span>¿Estás seguro de que deseas eliminar este usuario?</span>
        </div>
      ),
      header: "Confirmar eliminación",
      className: "custom-confirm-dialog",
      style: { borderRadius: "10px" },
      accept: async () => {
        try {
          await deleteInstructor(rowData.id);
          confirmDialog({
            message: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "2rem", color: "#00A859" }}
                />
                <span>El usuario fue eliminado correctamente.</span>
              </div>
            ),
            header: "Usuario eliminado",
            className: "custom-confirm-dialog",
            style: { borderRadius: "10px" },
            acceptLabel: "Aceptar",
            rejectVisible: false,
            footer: (props) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={props.accept}
                  style={{
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "#0fe581ff",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Aceptar
                </button>
              </div>
            ),
          });
          if (reloadTable) reloadTable();
        } catch (error) {
          console.error("Error al eliminar:", error);
          confirmDialog({
            message: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <i
                  className="pi pi-times-circle"
                  style={{ fontSize: "2rem", color: "#dc3545" }}
                />
                <span>No se pudo eliminar el usuario.</span>
              </div>
            ),
            header: "Error al eliminar",
            className: "custom-confirm-dialog",
            style: { borderRadius: "10px" },
            acceptLabel: "Aceptar",
            rejectVisible: false,
            footer: (props) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={props.accept}
                  style={{
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "#00A859",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Aceptar
                </button>
              </div>
            ),
          });
        }
      },
      reject: () => {},
      footer: (props) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={props.accept}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#dc3545",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Sí, eliminar
          </button>
          <button
            onClick={props.reject}
            style={{
              padding: "0.5rem 1.5rem",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "white",
              color: "#424242ff",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
      ),
    });
  };

  const handleEditUser = (rowData) => {
    setSelectedUser(rowData);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedUser(null);
    if (reloadTable) reloadTable();
  };

  const header = (
    <div>
      <div className="mb-3">
        <h2 className="fw-bold d-flex gap-2">{tableTitle}</h2>
      </div>

      <div className="d-flex justify-content-between headerContainer align-items-center">
        <div>
          <button
            className="p-button p-button-sm p-button-success rounded shadow-sm"
            onClick={functionModal}
          >
            <i className="pi pi-user-plus" style={{ marginRight: "0.5rem" }} />
          </button>
        </div>

        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginLeft: "1rem",
          }}
        >
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
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            style={{
              paddingLeft: "2rem",
              width: "250px",
            }}
          />
        </div>

        <div className="d-flex gap-2 containerButtonActions shadow-sm">
          <button
            className="btnActions d-flex align-items-center gap-2"
            onClick={functionModal}
          >
            <i
              className="pi pi-user-plus"
              style={{ color: "#28a745", fontSize: "1.2rem" }}
            />
            {/* Crear aprendiz */}
          </button>

          <button
            className="btnActions d-flex align-items-center gap-2"
            onClick={openCreatePerfil}
          >
            <i
              className="pi pi-id-card"
              style={{ color: "#28a745", fontSize: "1.2rem" }}
            />
            {/* Crear perfil */}
          </button>

          <button
            className="btnActions d-flex align-items-center gap-2"
            onClick={() => setOpenFichaModal(true)}
          >
            <i
              className="pi pi-book"
              style={{ color: "#28a745", fontSize: "1.2rem" }}
            />
            {/* Crear ficha */}
          </button>
        </div>
      </div>
    </div>
  );
  const actionBodyTemplate = (rowData) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <SplitButtonComp
        rowData={rowData}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
    </div>
  );

  return (
    <div className="mx-auto mt-2 shadow  tableAprendices">
      <Toast ref={toast} />
      <DataTable
        value={dataTable}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        globalFilter={globalFilter}
        globalFilterFields={globalFilterFields}
        emptyMessage="No se encontraron resultados."
        scrollable
        scrollHeight="420px"
        rowClassName={() => "my-custom-row"}
      >
        {nameValue.map(({ field, header }, idx) => (
          <Column
            key={idx}
            field={field}
            header={header}
            body={(rowData) =>
              rowData[field] !== null &&
              rowData[field] !== undefined &&
              rowData[field] !== "" ? (
                rowData[field]
              ) : (
                <span className="text-muted">—</span>
              )
            }
          />
        ))}

        <Column
          header="Foto"
          body={(rowData) => {
            const ruta = rowData.foto;
            const url = ruta?.startsWith("storage/")
              ? `http://localhost:8000/${ruta}`
              : ruta?.startsWith("http")
              ? ruta
              : null;

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
          }}
        />

        <Column
          header="Acciones"
          className="fw-bold"
          body={actionBodyTemplate}
        />
      </DataTable>

      <Dialog
        header="Actualizar Usuario"
        visible={openUpdateModal}
        style={{ width: "750px" }}
        onHide={handleCloseUpdateModal}
        modal
      >
        <FormInstructor
          usuarioSeleccionado={selectedUser}
          closeModal={handleCloseUpdateModal}
        />
      </Dialog>

      <Dialog
        header="Crear Ficha"
        visible={openFichaModal}
        style={{ width: "450px" }}
        onHide={() => setOpenFichaModal(false)}
        modal
      >
        <FormFicha
          closeModal={() => {
            setOpenFichaModal(false);
            if (reloadTable) reloadTable();
          }}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}
