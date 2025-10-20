import { SplitButton } from "primereact/splitbutton";
import "../../styles/SplitButton.css";
export default function SplitButtonComp() {
  const items = [
    {
      label: "Actualizar",
      icon: "pi pi-refresh",
    },
    {
      label: "Eliminar",
      icon: "pi pi-times",
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <SplitButton label="Acciones" icon="pi pi-plus" model={items} />
    </div>
  );
}
