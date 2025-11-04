import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getAllRegisters } from "./Services/FetchServices";
import "../styles/TablaHistorial.css";

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
    <div className="tablaHistorial shadow rounded">
      <div className="card">
        <div className="d-flex justify-content-between align-items-center mb-3 tableHistorialContent">
          <h5 className="mb-0">Historial de registros</h5>
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
        >
          <Column field="usuarios.nombre" header="Nombre"  />
          <Column field="usuarios.telefono" header="Teléfono"  />
          <Column field="usuarios.idperfil" header="Tipo de perfil"  />
          <Column field="fechaRegistro" header="Fecha de Registro"  />
        </DataTable>
      </div>
    </div>
  );
}