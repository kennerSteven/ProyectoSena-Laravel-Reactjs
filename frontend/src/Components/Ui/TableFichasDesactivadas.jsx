import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import {
  getFichasDesactivadas,
  deleteFicha,
  deleteFichasMasivo,
} from "../Services/FetchServices";
import "../../styles/TableFichasDesactivadas.css";

export default function TablaFichasDesactivadas() {
  const [fichas, setFichas] = useState([]);
  const [filteredFichas, setFilteredFichas] = useState([]);
  const [selectedFichas, setSelectedFichas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const cargarFichas = async () => {
    const response = await getFichasDesactivadas();
    const data = Array.isArray(response.fichas) ? response.fichas : [];
    setFichas(data);
    setFilteredFichas(data);
  };

  useEffect(() => {
    cargarFichas();
  }, []);

  const eliminarFicha = async (id) => {
    try {
      await deleteFicha(id);
      await cargarFichas(); 
    } catch (error) {
      console.error("Error al eliminar ficha:", error);
    }
  };

  const eliminarSeleccionadas = async () => {
    try {
      const ids = selectedFichas.map((f) => f.id);
      const result = await deleteFichasMasivo(ids);
      await cargarFichas(); 
      setSelectedFichas([]);
      console.log("Eliminadas:", result.eliminadas);
      console.log("No eliminadas:", result.noEliminadas);
    } catch (error) {
      console.error("Error al eliminar fichas seleccionadas:", error);
    }
  };

  const confirmarEliminarFicha = (id) => {
    confirmDialog({
      message: "¿Estás seguro de que deseas eliminar esta ficha?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => eliminarFicha(id),
    });
  };

  const confirmarEliminarSeleccionadas = () => {
    confirmDialog({
      message: `¿Eliminar ${selectedFichas.length} fichas seleccionadas?`,
      header: "Confirmar eliminación múltiple",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar todas",
      rejectLabel: "Cancelar",
      accept: () => eliminarSeleccionadas(),
    });
  };

  const estadoTemplate = (rowData) => (
    <Tag value={rowData.estado} severity="warning" />
  );

  const accionesTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      className="ButtonDelete"
      onClick={() => confirmarEliminarFicha(rowData.id)}
    />
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);

    const filtered = fichas.filter((f) =>
      [f.numeroFicha, f.nombrePrograma, f.jornada]
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredFichas(filtered);
  };

  return (
    <div className="card">
      <ConfirmDialog />

      <div className="d-flex justify-content-between align-items-center px-3 pt-3 mb-3">
    <div>
          <InputText
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Buscar ficha..."
          className="p-inputtext-sm"
        />
    </div>

        <Button
          label="Eliminar seleccionadas"
          icon="pi pi-trash"
          className="DeleteAll"
          disabled={selectedFichas.length === 0}
          onClick={confirmarEliminarSeleccionadas}
        />
      </div>

      <DataTable
        value={filteredFichas}
        selection={selectedFichas}
        onSelectionChange={(e) => setSelectedFichas(e.value)}
        dataKey="id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        emptyMessage="No hay fichas desactivadas."
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="numeroFicha" header="Código" />
        <Column field="nombrePrograma" header="Programa" />
        <Column field="jornada" header="Jornada" />
        <Column field="estado" header="Estado" body={estadoTemplate} />
        <Column
          header="Acciones"
          body={accionesTemplate}
          style={{ width: "6rem" }}
        />
      </DataTable>
    </div>
  );
}