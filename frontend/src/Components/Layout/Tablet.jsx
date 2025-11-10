import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Tooltip } from "primereact/tooltip";
import SplitButtonComp from "../Ui/SplitButton";
import FormInstructor from "../Form/FormInstructor";
import TablaActivarUsuarios from "../Form/TableActivarInstructor";
import { deleteInstructor } from "../Services/FetchServices";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import "../../styles/ActivarInstructor.css";

export default function Table({
  tableTitle,
  nameValue = [],
  dataTable = [],
  functionModal,
  openCreatePerfil,
  reloadTable,
  fetchUsuariosDesactivados,
  labelUserDisabled,
  activarUsuariosPorLote,
  activarUsuarioPorId
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [showEnabledInstructors, setShowEnabledInstructors] = useState(false);
  const toast = useRef(null);

  const globalFilterFields = nameValue.map(({ field }) => field);
  const { perfiles } = useTipoPerfilFetch("Instructor");

  const opcionesPerfil = perfiles.map((p) => ({
    label: p.nombre,
    value: p.id,
  }));

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
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo eliminar el usuario",
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

  const actionBodyTemplate = (rowData) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <SplitButtonComp
        rowData={rowData}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
    </div>
  );

  const header = (
    <div>
      <div className="mb-3">
        <h2 className="fw-bold d-flex gap-2">{tableTitle}</h2>
      </div>

      <div className="d-flex justify-content-between headerContainer align-items-center">
        <div className="d-flex gap-3 align-items-center">
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
              style={{ paddingLeft: "2rem", width: "250px" }}
            />
          </div>

          <Dropdown
            value={perfilSeleccionado}
            options={opcionesPerfil}
            onChange={(e) => setPerfilSeleccionado(e.value)}
            placeholder="Filtrar por perfil"
            className="w-100"
            style={{ width: "250px" }}
            showClear
          />
        </div>

        <>
          <Tooltip
            target=".btn-crear-instructor"
            content="Crear instructor"
            position="top"
          />
          <Tooltip
            target=".btn-crear-perfil"
            content="Crear perfil"
            position="top"
          />
          <Tooltip
            target=".btn-ver-inactivos"
            content="Usuarios desactivados"
            position="top"
          />

          <div className="d-flex gap-2 containerButtonActions shadow-sm">
            <button
              className="btnActions btn-crear-instructor d-flex align-items-center gap-2"
              onClick={functionModal}
            >
              <i
                className="pi pi-user-plus"
                style={{ color: "#28a745", fontSize: "1.4rem" }}
              />
            </button>

            <button
              className="btnActions btn-crear-perfil d-flex align-items-center gap-2"
              onClick={openCreatePerfil}
            >
              <i
                className="pi pi-id-card"
                style={{ color: "#28a745", fontSize: "1.4rem" }}
              />
            </button>

            <button
              onClick={() => setShowEnabledInstructors(true)}
              className="btn-ver-inactivos seeTableDisabledInstructors d-flex align-items-center gap-2"
            >
              <i
                className="pi pi-id-card"
                style={{ color: "#ffffff", fontSize: "1.4rem" }}
              />
            </button>
          </div>
        </>
      </div>
    </div>
  );

  return (
    <div className="mx-auto mt-4 shadow tableContainer">
      <Toast ref={toast} />

      <DataTable
        value={dataTable.filter((item) => {
          const coincidePerfil = perfilSeleccionado
            ? item.tipoPerfil?.id === perfilSeleccionado
            : true;

          const coincideGlobal = globalFilterFields.some((field) =>
            item[field]?.toLowerCase?.().includes(globalFilter.toLowerCase())
          );

          return coincidePerfil && coincideGlobal;
        })}
        paginator
        rows={10}
        header={header}
        globalFilterFields={globalFilterFields}
        emptyMessage="No se encontraron resultados"
        scrollable
        scrollHeight="280px"
        rowClassName={() => "my-custom-row"}
      >
        {nameValue.map(({ field, header }) => (
          <Column
            key={field}
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
        header={labelUserDisabled}
        visible={showEnabledInstructors}
        style={{ width: "800px" }}
        onHide={() => setShowEnabledInstructors(false)}
        modal
      >
        <TablaActivarUsuarios
        activarUsuarioPorId={activarUsuarioPorId}
        activarUsuariosPorLote={activarUsuariosPorLote}
          fetchUsuariosDesactivados={fetchUsuariosDesactivados}
          closeModal={() => setShowEnabledInstructors(false)}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}
