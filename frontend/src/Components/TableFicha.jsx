import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { getFichas, getUsuariosDeFicha } from "./Services/FetchServices";
import "../styles/TablaHistorial.css";

export default function TablaFicha() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [fichas, setFichas] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosFicha, setUsuariosFicha] = useState([]);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFichas();
      setFichas(data);
    };
    fetchData();
  }, []);

  const jornadas = [...new Set(fichas.map((f) => f.jornada))].filter(Boolean);
  const estados = [...new Set(fichas.map((f) => f.estado))].filter(Boolean);

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

  const estadoFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={estados}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Filtrar estado"
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

  return (
    <div className="tableHistorialContent mx-auto">
      <div className="row">
        <div className="">
          <div className="card shadow-sm border-light">
            <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
              <InputText
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                }}
                placeholder="Buscar ficha..."
              />
            </div>

            <DataTable
              value={fichas}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              globalFilter={globalFilter} // ✅
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
                field="estado"
                header="Estado"
                filter
                filterElement={estadoFilterTemplate}
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
          <Column field="numeroDocumento" header="Documento" />
          <Column field="telefono" header="Teléfono" />
        </DataTable>
      </Dialog>
    </div>
  );
}
