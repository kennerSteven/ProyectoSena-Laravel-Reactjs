import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { getFichasDesactivadas, deleteFicha,deleteFichasMasivo } from "../Services/FetchServices";
import "../../styles/TableFichasDesactivadas.css"
export default function TablaFichasDesactivadas() {
  const [fichas, setFichas] = useState([]);
  const [selectedFichas, setSelectedFichas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFichasDesactivadas();
      const data = Array.isArray(response.fichas) ? response.fichas : [];
      setFichas(data);
    };
    fetchData();
  }, []);







  const eliminarFicha = async (id) => {
    try {
      await deleteFicha(id);
      setFichas((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error al eliminar ficha:", error);
    }
  };

const eliminarSeleccionadas = async () => {
  try {
    const ids = selectedFichas.map((f) => f.id);
    const result = await deleteFichasMasivo(ids);

    // Filtrar eliminadas
    setFichas((prev) => prev.filter((f) => !result.eliminadas.includes(f.id)));
    setSelectedFichas([]);

    // Opcional: mostrar feedback
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

  return (
    <div className="card">
      <ConfirmDialog />

      <div className="d-flex justify-content-end align-items-center px-3 pt-3 mb-3">

        <Button
          label="Eliminar seleccionadas"
          icon="pi pi-trash"
          className="DeleteAll"
          disabled={selectedFichas.length === 0}
          onClick={confirmarEliminarSeleccionadas}
        />
      </div>

      <DataTable
        value={fichas}
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
        <Column header="Acciones" body={accionesTemplate} style={{ width: "6rem" }} />
      </DataTable>
    </div>
  );
}