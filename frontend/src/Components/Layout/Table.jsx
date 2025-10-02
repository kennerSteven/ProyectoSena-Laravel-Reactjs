import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import "../../styles/Table.css";

export default function Table({ tableTitle, nameValue = [], dataTable }) {
  const [valueTable, setValueTable] = useState(dataTable);
  const [globalFilter, setGlobalFilter] = useState("");

  const globalFilterFields = [...nameValue];

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "0.5rem",
      }}
    >
      <h2>{tableTitle}</h2>
      <InputText
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
        style={{ width: "350px" }}
      />
    </div>
  );

  const actionBodyTemplate = () => {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button icon="pi pi-pencil" className="btnGeneral update" />
        <Button icon="pi pi-trash" className="btnGeneral delete" />
      </div>
    );
  };

  return (
    <div className="mx-auto mt-4 shadow-sm rounded" style={{ width: "1100px" }}>
      <DataTable
       rowClassName={() => "my-custom-row"}
        selectionMode="single"
        value={valueTable}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "60rem" }}
        header={header}
        globalFilter={globalFilter}
        globalFilterFields={globalFilterFields}
        emptyMessage="No se encontraron resultados."
      >
        {nameValue.map((colName, idx) => (
          <Column key={idx} field={colName} header={colName} />
        ))}

        <Column header="Acciones" className="fw-bold" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
