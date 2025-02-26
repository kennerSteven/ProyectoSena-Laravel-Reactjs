import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import {
  getFichas,
  getUsuariosDeFicha,
  updateFicha,
  desactivarFicha,
} from "./Services/FetchServices";
import "../styles/TablaHistorial.css";
import TablaFichasDesactivadas from "./Ui/TableFichasDesactivadas";
import CrearFicha from "./Form/FormFicha";
import "../styles/Table.css";
import Swal from "sweetalert2";
export default function TablaFicha() {
  const [showModalFichasDesactivadas, setShowModalFichasDesactivadas] =
    useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFormacion, setShowFormacion] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosFicha, setUsuariosFicha] = useState([]);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);

  const [accionModalVisible, setAccionModalVisible] = useState(false);
  const [fichaParaAccion, setFichaParaAccion] = useState(null);

  const [editarModalVisible, setEditarModalVisible] = useState(false);
  const [fichaParaEditar, setFichaParaEditar] = useState(null);

  const toast = useRef(null);

  useEffect(() => {
    cargarFichas();
  }, []);

  const cargarFichas = async () => {
    const data = await getFichas();
    setFichas(data);
  };

  const jornadas = [...new Set(fichas.map((f) => f.jornada))].filter(Boolean);

  const jornadaFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={jornadas}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Filtrar jornada"
      className="p-column-filter"
      showClear
    />
  );

  const jornadaBodyTemplate = (rowData) => {
    const jornada = rowData.jornada;
    const getColor = (jornada) => {
      switch (jornada?.toLowerCase()) {
        case "mañana":
          return "info";
        case "tarde":
          return "warning";
        case "noche":
          return "danger";
        default:
          return null;
      }
    };
    return <Tag value={jornada} severity={getColor(jornada)} />;
  };

  const handleRowClick = async (ficha) => {
    setFichaSeleccionada(ficha);
    try {
      const response = await getUsuariosDeFicha(ficha.id);
      const usuarios = Array.isArray(response) ? response : [];
      setUsuariosFicha(usuarios);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al cargar usuarios de la ficha:", error);
      setUsuariosFicha([]);
      setModalVisible(true);
    }
  };

  const abrirModalAccion = (ficha) => {
    setFichaParaAccion(ficha);
    setAccionModalVisible(true);
  };

  const abrirModalEditar = (ficha) => {
    setFichaParaEditar(ficha);
    setEditarModalVisible(true);
  };

  const confirmarDesactivacion = async () => {
    try {
      await desactivarFicha(fichaParaAccion.id);

      Swal.fire({
        icon: "warning",
        title: "Ficha desactivada ",
        text: `La ficha ${fichaParaAccion.nombrePrograma} fue desactivada correctamente. Para ver las fichas desactivadas accede al panel de formaciones desactivadas.`,
        confirmButtonText: "Aceptar",
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });

      setAccionModalVisible(false);
      cargarFichas();
    } catch (error) {
      console.error("Error al desactivar ficha:", error);
    }
  };

  const confirmarActualizacion = async (datosActualizados) => {
    try {
      await updateFicha(fichaParaEditar.id, datosActualizados);

      Swal.fire({
        icon: "success",
        title: "Ficha actualizada",
        text: `La ficha ${fichaParaEditar.nombrePrograma} fue actualizada correctamente.`,
        confirmButtonText: "Aceptar",
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
          confirmButton: "buttonConfirmSwal",
        },
      });

      setEditarModalVisible(false);
      cargarFichas();
    } catch (error) {
      console.error("Error al actualizar ficha:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "No se pudo actualizar la ficha. Intenta nuevamente.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const accionesBodyTemplate = (rowData) => (
    <div className="d-flex gap-2">
      <button
        className="btnDesactivar desactivar"
        onClick={(e) => {
          e.stopPropagation();
          abrirModalAccion(rowData);
        }}
      >
        <i className="bi bi-exclamation-triangle-fill p-2"></i>
      </button>
      <button
        className="btnActualizars actualizar"
        onClick={(e) => {
          e.stopPropagation();
          abrirModalEditar(rowData);
        }}
      >
        <i className="bi bi-pencil-square p-2"></i>
      </button>

      <Tooltip target=".desactivar" content="Desactivar ficha" position="top" />
      <Tooltip target=".actualizar" content="Actualizar ficha" position="top" />
    </div>
  );
  return (
    <div className="tableHistorialContent mx-auto shadow mt-4 tableContainer">
      <Toast ref={toast} />

      <div className="row">
        <div>
          <div className="card shadow-sm border-light">
            <div className="d-flex align-items-center justify-content-between px-4 py-3 shadow">
              <h2 className="fw-bold">Formaciones</h2>

              <div>
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
              </div>

              <div>
                <div className="d-flex gap-1 containerButtonActions shadow-sm">
                  <button
                    onClick={() => setShowModalFichasDesactivadas(true)}
                    className="btnActionsFicha d-flex align-items-center gap-2 btn-crear-instructor"
                  >
                    <i
                      className="pi pi-table"
                      style={{ fontSize: "1.2rem", color: "#e8ad17ff" }}
                    />
                  </button>

                  <button
                    onClick={() => setShowFormacion(true)}
                    className="btnActionsFicha d-flex align-items-center gap-2 btn-crear-perfil"
                  >
                    <i
                      className="pi pi-building"
                      style={{ fontSize: "1.2rem", color: "#1779e8ff" }}
                    />
                  </button>
                </div>
              </div>

              <Tooltip
                target=".btn-crear-instructor"
                content="Formaciones desactivadas"
                position="top"
              />
              <Tooltip
                target=".btn-crear-perfil"
                content="Crear Formaciones"
                position="top"
              />
            </div>

            <DataTable
              value={fichas}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              globalFilter={globalFilter}
              filterDisplay="row"
              globalFilterFields={[
                "nombrePrograma",
                "numeroFicha",
                "jornada",
                "estado",
              ]}
              scrollHeight="350px"
              className="custom-table"
              emptyMessage="No se encontraron fichas."
              selectionMode="single"
              onRowClick={(e) => handleRowClick(e.data)}
            >
              <Column
                field="nombrePrograma"
                header="Nombre de Ficha"
                filter
                filterPlaceholder="Buscar nombre"
              />
              <Column
                field="numeroFicha"
                header="Código de Ficha"
                filter
                filterPlaceholder="Buscar código"
              />

              <Column
                field="jornada"
                header="Jornada"
                filter
                filterElement={jornadaFilterTemplate}
                body={jornadaBodyTemplate}
              />
              <Column
                header="Estado"
                body={(rowData) => (
                  <Tag
                    value={rowData.estado === "activo" ? "Activo" : "Inactivo"}
                    severity={
                      rowData.estado === "activo" ? "success" : "danger"
                    }
                  />
                )}
              />
              <Column
                header="Acciones"
                body={accionesBodyTemplate}
                style={{ textAlign: "center", width: "8rem" }}
              />
            </DataTable>
          </div>
        </div>
      </div>

      <Dialog
        header={`Aprendices vinculados a ficha ${
          fichaSeleccionada?.numeroFicha || ""
        }`}
        visible={modalVisible}
        style={{ width: "50vw" }}
        onHide={() => setModalVisible(false)}
      >
        <div className="mb-3 d-flex justify-content-end px-2">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar aprendiz..."
            className="w-50"
          />
        </div>

        <DataTable
          value={Array.isArray(usuariosFicha) ? usuariosFicha : []}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          globalFilter={globalFilter}
          globalFilterFields={[
            "nombre",
            "apellido",
            "numeroDocumento",
            "telefono",
            "correo",
          ]}
          emptyMessage="No hay usuarios vinculados."
          scrollHeight="300px"
        >
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column
            field="tipoDocumento"
            header="Tipo de documento"
            filter
            filterPlaceholder="Buscar código"
          />
          <Column field="numeroDocumento" header="Documento" />

          <Column field="telefono" header="Teléfono" />
        </DataTable>
      </Dialog>

      <Dialog
        header={`Desactivar ficha ${fichaParaAccion?.numeroFicha || ""}`}
        visible={accionModalVisible}
        style={{ width: "30vw" }}
        onHide={() => setAccionModalVisible(false)}
      >
        <p className="py-2">¿Estás seguro de desactivar esta ficha?</p>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-link text-decoration-none text-dark"
            onClick={() => setAccionModalVisible(false)}
          >
            Cancelar
          </button>
          <button className="btn btn-warning" onClick={confirmarDesactivacion}>
            Desactivar
          </button>
        </div>
      </Dialog>

      <Dialog
        header={`Editar ficha ${fichaParaEditar?.numeroFicha || ""}`}
        visible={editarModalVisible}
        style={{ width: "30vw" }}
        onHide={() => setEditarModalVisible(false)}
      >
        <div className="my-3">
          <label className="form-label">Nombre del Programa</label>
          <InputText
            value={fichaParaEditar?.nombrePrograma || ""}
            onChange={(e) =>
              setFichaParaEditar((prev) => ({
                ...prev,
                nombrePrograma: e.target.value,
              }))
            }
            className="w-100"
          />
        </div>

        <div className="my-3">
          <label className="form-label">Código de Ficha</label>
          <InputText
            value={fichaParaEditar?.numeroFicha || ""}
            onChange={(e) =>
              setFichaParaEditar((prev) => ({
                ...prev,
                numeroFicha: e.target.value,
              }))
            }
            className="w-100"
          />
        </div>

        <div className="my-3">
          <label className="form-label">Jornada</label>
          <Dropdown
            value={fichaParaEditar?.jornada || ""}
            options={jornadas}
            onChange={(e) =>
              setFichaParaEditar((prev) => ({
                ...prev,
                jornada: e.value,
              }))
            }
            placeholder="Selecciona jornada"
            className="w-100"
            showClear
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-link text-decoration-none text-dark"
            onClick={() => setEditarModalVisible(false)}
          >
            Cancelar
          </button>
          <button
            className="btnVisitantesActivos"
            onClick={() => confirmarActualizacion(fichaParaEditar)}
          >
            Guardar cambios
          </button>
        </div>
      </Dialog>

      <Dialog
        header="Fichas desactivadas"
        visible={showModalFichasDesactivadas}
        style={{ width: "900px" }}
        modal
        onHide={() => setShowModalFichasDesactivadas(false)}
      >
        {showModalFichasDesactivadas && <TablaFichasDesactivadas />}
      </Dialog>

      <Dialog
        header="Crear formación"
        visible={showFormacion}
        style={{ width: "400px" }}
        modal
        onHide={() => setShowFormacion(false)}
      >
        {showFormacion && (
          <CrearFicha
            onAceptar={async () => {
              setShowFormacion(false);
              await cargarFichas();
            }}
          />
        )}
      </Dialog>
    </div>
  );
}
