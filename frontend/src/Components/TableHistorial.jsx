import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getAllRegisters } from "./Services/FetchServices";
import "../styles/TablaHistorial.css";
import KPI from "./Pages/MainDash/Kpi";

export default function TablaHistorial() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRegisters();
      setUsuarios(data);
    };
    fetchData();
  }, []);

  return (
    <div className="tablaHistorial ">
      <div className="row">
        <div className="">
          <div className="card shadow-sm border-light">
            <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
              <span className="p-input-icon-left">
                <InputText
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Buscar..."
                />
              </span>
            </div>

            <DataTable
              value={usuarios}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              globalFilter={globalFilter}
              scrollHeight="350px"
              className="custom-table"
            >
              <Column field="usuarios.nombre" header="Nombre" />
              <Column field="usuarios.telefono" header="Teléfono" />
              <Column field="usuarios.perfile.nombre" header="Tipo de perfil" />
              <Column field="fechaRegistro" header="Fecha de Registro" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
