import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

export default function PaginatorWithSearchDemo() {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      country: { name: "USA" },
      company: "Acme Corp",
      representative: { name: "Alice" },
    },
    {
      id: 2,
      name: "Jane Smith",
      country: { name: "Canada" },
      company: "Tech Solutions",
      representative: { name: "Bob" },
    },
    {
      id: 3,
      name: "Michael Johnson",
      country: { name: "UK" },
      company: "Innovate Ltd",
      representative: { name: "Carol" },
    },
    {
      id: 4,
      name: "Emily Davis",
      country: { name: "Germany" },
      company: "Future Tech",
      representative: { name: "Dave" },
    },
    {
      id: 5,
      name: "William Brown",
      country: { name: "France" },
      company: "Creative Co",
      representative: { name: "Eve" },
    },
    {
      id: 6,
      name: "Sophia Wilson",
      country: { name: "Spain" },
      company: "Design Hub",
      representative: { name: "Frank" },
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-refresh"
      text
      onClick={() => alert("Refreshed!")}
    />
  );
  const paginatorRight = (
    <Button
      type="button"
      icon="pi pi-download"
      text
      onClick={() => alert("Downloaded!")}
    />
  );

  // Header con el input de búsqueda visible
  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "0.5rem",
      }}
    >
      <InputText
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Keyword Search"
        style={{ width: "250px" }}
      />
    </div>
  );

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        header={header} // <--- Muy importante
        globalFilter={globalFilter}
        globalFilterFields={[
          "name",
          "country.name",
          "company",
          "representative.name",
        ]}
        emptyMessage="No customers found."
      >
        <Column field="name" header="Name" style={{ width: "25%" }} />
        <Column
          field="country.name"
          header="Country"
          style={{ width: "25%" }}
        />
        <Column field="company" header="Company" style={{ width: "25%" }} />
        <Column
          field="representative.name"
          header="Representative"
          style={{ width: "25%" }}
        />
      </DataTable>
    </div>
  );
}
