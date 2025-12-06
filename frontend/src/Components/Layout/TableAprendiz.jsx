import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
// El import de SpeedDial no se usa, lo mantengo por si acaso.
// import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import { Tooltip } from "primereact/tooltip";

import SplitButtonComp from "../Ui/SplitButton";
import FormFicha from "../Form/FormFicha";
import "../../styles/Table.css";
import FormAprendiz from "../Form/FormAprendiz";

export default function TableAprendizs({
  tableTitle,
  nameValue = [],
  dataTable = [],
  functionModal, // Usado para abrir el modal de creación de Aprendiz
  openCreatePerfil,
  reloadTable, // Función pasada desde el componente padre para recargar los datos
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openFichaModal, setOpenFichaModal] = useState(false);
  const toast = useRef(null);

  const globalFilterFields = nameValue.map(({ field }) => field);

  const handleEditUser = (rowData) => {
    setSelectedUser(rowData);
    setOpenUpdateModal(true);
  }; // MODIFICACIÓN CLAVE: Esta función ahora acepta un argumento y llama a reloadTable

  const handleCloseUpdateModal = (shouldReload = false) => {
    setOpenUpdateModal(false);
    if (shouldReload && reloadTable) {
      reloadTable(); // Recarga la tabla si el formulario indica que fue exitoso
    }
    setSelectedUser(null);
  };

  const header = (
    <div>
      <div className="mb-1">
        <h2 className="fw-bold d-flex gap-2">{tableTitle}</h2>
      </div>
      <div className="d-flex justify-content-between headerContainer align-items-center">
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

        <div className="d-flex containerButtonActions shadow-sm">
          <button
            className="btnActions d-flex align-items-center gap-2 btn-crear-aprendiz"
            onClick={functionModal}
          >
            <i
              className="pi pi-user-plus"
              style={{ color: "#28a745", fontSize: "1.4rem" }}
            />
          </button>

          <button
            className="btnActions d-flex align-items-center gap-2 btn-crear-perfil"
            onClick={openCreatePerfil}
          >
            <i
              className="pi pi-id-card"
              style={{ color: "#17a2b8", fontSize: "1.4rem" }}
            />
          </button>

          <button
            className="btnActions d-flex align-items-center gap-2 btn-crear-formacion"
            onClick={() => setOpenFichaModal(true)}
          >
            <i
              className="pi pi-book"
              style={{ color: "#ffc107", fontSize: "1.4rem" }}
            />
          </button>

          <Tooltip
            target=".btn-crear-aprendiz"
            content="Crear aprendices"
            position="top"
          />

          <Tooltip
            target=".btn-crear-perfil"
            content="Crear perfil"
            position="top"
          />

          <Tooltip
            target=".btn-crear-formacion"
            content="Crear Formacion"
            position="top"
          />
        </div>
      </div>{" "}
    </div>
  );
  const actionBodyTemplate = (rowData) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <SplitButtonComp rowData={rowData} onEdit={handleEditUser} />
    </div>
  );

  return (
    <div className="mx-auto mt-2 shadow tableAprendices">
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
        scrollHeight="500px"
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
        header="Actualizar Aprendiz"
        visible={openUpdateModal}
        style={{ width: "750px" }}
        onHide={() => handleCloseUpdateModal(false)} // No recargar si se cierra manualmente
        modal
      >
        {" "}
        <FormAprendiz
          usuarioSeleccionado={selectedUser}
          closeModal={() => handleCloseUpdateModal(true)} // Recargar si el formulario fue exitoso
        />{" "}
      </Dialog>
      {/* Diálogo de Creación de Ficha */}
      <Dialog
        header="Crear Ficha"
        visible={openFichaModal}
        style={{ width: "450px" }}
        onHide={() => setOpenFichaModal(false)}
        modal
      >
        {" "}
        <FormFicha
          closeModal={() => {
            setOpenFichaModal(false);
            if (reloadTable) reloadTable(); // Recargar después de crear una Ficha
          }}
        />
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}
