import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";

import SplitButtonComp from "../Ui/SplitButton";
import "../../styles/Table.css";

export default function Table({
  tableTitle,
  nameValue = [],
  dataTable = [],
  nameButton,
  functionModal,
  openCreatePerfil,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef(null);

  const globalFilterFields = nameValue.map(({ field }) => field);

  const speedDialItems = [
    {
      label: nameButton,
      icon: "pi pi-user-plus",
      command: functionModal,
    },
    {
      label: "Actualizar",
      icon: "pi pi-id-card",
      command: openCreatePerfil,
    },
  ];

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
      <div className="d-flex ">
        <div>
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
              left: "425px",
              top: "33px",
            }}
          />
        </div>
        <div>
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            style={{ width: "350px", position: "relative" }}
          />
        </div>
      </div>
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <SplitButtonComp rowData={rowData} />
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

  return (
    <div className=" mt-4 shadow tableContainer">
      <Toast ref={toast} />
      <DataTable
        rowClassName={() => "my-custom-row"}
        selectionMode="single"
        value={dataTable}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "60rem" }}
        header={header}
        globalFilter={globalFilter}
        globalFilterFields={globalFilterFields}
        emptyMessage="No se encontraron resultados."
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
    </div>
  );
}
