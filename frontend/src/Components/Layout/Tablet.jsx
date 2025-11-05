import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { deleteInstructor } from "../Services/FetchServices";
import SplitButtonComp from "../Ui/SplitButton";
import FormInstructor from "../Form/FormInstructor";
import "../../styles/Table.css";

export default function Table({
  tableTitle,
  nameValue = [],
  dataTable = [],
  functionModal,
  openCreatePerfil,
  openCreateFormation,
  reloadTable,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const toast = useRef(null);

  const globalFilterFields = nameValue.map(({ field }) => field);

  const speedDialItems = [
    { icon: "pi pi-user-plus", command: functionModal },
    { icon: "pi pi-id-card", command: openCreatePerfil },
    { icon: "pi pi-book", command: openCreateFormation },
  ];

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
      style: {
        borderRadius: "10px",
      },
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
            style: {
              borderRadius: "10px",
            },
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
            style: {
              borderRadius: "10px",
            },
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
            onClick={props.reject}
            style={{
              padding: "0.5rem 1.5rem",
              border: "2px solid #00A859",
              borderRadius: "10px",
              backgroundColor: "white",
              color: "#00A859",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "0.5rem",
      }}
    >
      <h2>{tableTitle}</h2>
      <div className="d-flex">
        <SpeedDial
          model={speedDialItems}
          direction="left"
          buttonClassName="p-button-rounded p-button-success"
          showIcon="pi pi-bars"
          hideIcon="pi pi-times"
          radius={0}
          style={{
            width: "350px",
            position: "absolute",
            left: "350px",
            top: "33px",
          }}
        />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          style={{ width: "250px", position: "relative" }}
        />
      </div>
    </div>
  );

  const renderCell = (field) => (rowData) =>
    rowData[field] !== null &&
    rowData[field] !== undefined &&
    rowData[field] !== "" ? (
      rowData[field]
    ) : (
      <span className="text-muted">—</span>
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
    <div className="mx-auto mt-2 shadow tableContainer">
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
            body={renderCell(field)}
          />
        ))}
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
      <ConfirmDialog />
    </div>
  );
}
