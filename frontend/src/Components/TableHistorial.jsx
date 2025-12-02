import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";

import "../styles/TablaHistorial.css";

export default function TablaHistorial({
  getRegisters,
  showColumnaIngreso = true,
  showPlaca = true,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    "usuarios.nombre": { value: null, matchMode: "contains" },
    "usuarios.apellido": { value: null, matchMode: "contains" },
    "usuarios.telefono": { value: null, matchMode: "contains" },
    "usuarios.numeroDocumento": { value: null, matchMode: "contains" },
    "usuarios.perfile.nombre": { value: null, matchMode: "contains" },
    tipo: { value: null, matchMode: "contains" },
    fechaRegistro: { value: null, matchMode: "equals" },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegisters();
      setUsuarios(data);
    };
    fetchData();
  }, [getRegisters]);

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
      value={options.value ? new Date(options.value) : null}
      onChange={(e) => {
        const date = e.value;
        const isoDate = date ? date.toISOString().split("T")[0] : null;
        options.filterApplyCallback(isoDate);
      }}
      dateFormat="yy-mm-dd"
      placeholder="Filtrar fecha"
      className="p-column-filter"
    />
  );

  const perfilBodyTemplate = (rowData) => {
    const perfil = rowData.usuarios?.perfile?.nombre;

    const getColor = (perfil) => {
      const lower = perfil?.toLowerCase();
      if (lower?.includes("instructor")) return "info";
      if (lower?.includes("aprendiz")) return "success";
      if (lower?.includes("administrativo")) return "warning";
      return null;
    };

    return <Tag value={perfil} severity={getColor(perfil)} />;
  };

  const tipoBodyTemplate = (rowData) => {
    const tipo = rowData.tipo;

    const getColor = (tipo) => {
      switch (tipo?.toLowerCase()) {
        case "entrada":
          return "info";
        case "salida":
          return "danger";
        default:
          return null;
      }
    };

    return <Tag value={tipo} severity={getColor(tipo)} />;
  };

  const ingresoBodyTemplate = (rowData) => {
    const tipoVehiculo = rowData.vehiculo?.tipoVehiculo;
    return <span>{tipoVehiculo ? tipoVehiculo : "Sin vehículo"}</span>;
  };

  const placaBodyTemplate = (rowData) => {
    const placa = rowData.vehiculo?.placa;
    return <span>{placa ? placa : "No aplica"}</span>;
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
                style={{ width: "150px" }}
                placeholder="Buscar..."
              />
            </div>

            <DataTable
              value={usuarios}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20, 50]}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={[
                "usuarios.nombre",
                "usuarios.apellido",
                "usuarios.telefono",
                "usuarios.numeroDocumento",
                "usuarios.perfile.nombre",
                "tipo",
                "fechaRegistro",
              ]}
              scrollHeight="500px"
              className="custom-table"
              emptyMessage="No se encontraron registros."
            >
              <Column
                field="usuarios.nombre"
                header="Nombre"
                filter
                filterPlaceholder="Nombre"
                style={{ width: "140px" }}
              />
              <Column
                field="usuarios.apellido"
                header="Apellido"
                filter
                filterPlaceholder="Apellido"
                style={{ width: "160px" }}
              />
              <Column
                field="usuarios.telefono"
                header="Teléfono"
                filter
                filterPlaceholder="Teléfono"
                style={{ width: "140px" }}
              />
              <Column
                field="usuarios.numeroDocumento"
                header="Documento"
                filter
                filterPlaceholder="Documento"
                style={{ width: "160px" }}
              />

              {showColumnaIngreso && (
                <Column
                  field="vehiculo.tipoVehiculo"
                  header="Ingreso"
                  body={ingresoBodyTemplate}
                  filter={false}
                  style={{ width: "110px" }}
                />
              )}
              {showPlaca && (
                <Column
                  field="vehiculo.placa"
                  header="Placa"
                  body={placaBodyTemplate}
                  filter={false}
                  style={{ width: "110px" }}
                />
              )}

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
                style={{ width: "170px" }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
