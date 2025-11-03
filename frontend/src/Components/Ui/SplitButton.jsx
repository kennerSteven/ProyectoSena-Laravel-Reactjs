import { SplitButton } from "primereact/splitbutton";
import "../../styles/SplitButton.css";

import "primeicons/primeicons.css";

export default function SplitButtonComp({ rowData, onEdit, onDelete }) {
  const items = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => onEdit(rowData),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => onDelete(rowData),
    },
  ];

  return (
    <SplitButton
      label="Acciones"
      model={items}
      className="p-button-sm p-button-outlined"
    />
  );
}
