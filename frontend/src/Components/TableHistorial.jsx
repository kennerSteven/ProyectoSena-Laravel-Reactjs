import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import { getAllRegisters } from "./Services/FetchServices";
import "../styles/TablaHistorial.css";

export default function TablaHistorial() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    "usuarios.perfile.nombre": { value: null, matchMode: "equals" },
    tipo: { value: null, matchMode: "equals" },
    fechaRegistro: { value: null, matchMode: "dateIs" },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRegisters();
      setUsuarios(data);
    };
    fetchData();
  }, []);

  const perfiles = [
    ...new Set(usuarios.map((u) => u.usuarios?.perfile?.nombre)),
  ].filter(Boolean);
  const tipos = [...new Set(usuarios.map((u) => u.tipo))].filter(Boolean);

  const perfilFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={perfiles}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Filtrar perfil"
      className="p-column-filter"
      showClear
    />
  );

  const tipoFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={tipos}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Filtrar tipo"
      className="p-column-filter"
      showClear
    />
  );

  const fechaFilterTemplate = (options) => (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterApplyCallback(e.value)}
      dateFormat="yy-mm-dd"
      placeholder="Filtrar fecha"
      className="p-column-filter"
    />
  );

  const perfilBodyTemplate = (rowData) => {
    const perfil = rowData.usuarios?.perfile?.nombre;

    const getColor = (perfil) => {
      switch (perfil?.toLowerCase()) {
        case "instructor":
          return "info";
        case "aprendiz":
          return "success";
        case "administrativo":
          return "warning";
        default:
          return null;
      }
    };

    return <Tag value={perfil} severity={getColor(perfil)} />;
  };

  const tipoBodyTemplate = (rowData) => {
    const tipo = rowData.tipo;

    const getColor = (tipo) => {
      switch (tipo?.toLowerCase()) {
        case "entrada":
          return "info"; // azul claro
        case "salida":
          return "danger"; // rojo
        default:
          return null;
      }
    };

    return <Tag value={tipo} severity={getColor(tipo)} />;
  };

  return (
    <div className="tableHistorialContent">
      <div className="row">
        <div className="">
          <div className="card shadow-sm border-light">
            <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
              <InputText
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  setFilters((prev) => ({
                    ...prev,
                    global: { ...prev.global, value: e.target.value },
                  }));
                }}
                placeholder="Buscar..."
              />
            </div>

            <DataTable
              value={usuarios}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={[
                "usuarios.nombre",
                "usuarios.telefono",
                "usuarios.perfile.nombre",
                "tipo",
                "fechaRegistro",
              ]}
              scrollHeight="350px"
              className="custom-table"
              emptyMessage="No se encontraron registros."
            >
              <Column
                field="usuarios.nombre"
                header="Nombre"
                filter
                filterPlaceholder="Buscar nombre"
              />
              <Column
                field="usuarios.telefono"
                header="Teléfono"
                filter
                filterPlaceholder="Buscar teléfono"
              />
              <Column
                field="usuarios.perfile.nombre"
                header="Tipo de perfil"
                filter
                filterElement={perfilFilterTemplate}
                body={perfilBodyTemplate}
              />
              <Column
                field="tipo"
                header="Tipo"
                filter
                filterElement={tipoFilterTemplate}
                body={tipoBodyTemplate}
              />
              <Column
                field="fechaRegistro"
                header="Fecha de Registro"
                dataType="date"
                filter
                filterElement={fechaFilterTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
