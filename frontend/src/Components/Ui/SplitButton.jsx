import { SplitButton } from "primereact/splitbutton";
import "../../styles/SplitButton.css";

export default function SplitButtonComp() {
  const items = [
    {
      label: "Actualizar ",
      icon: "pi pi-refresh text-primary", // Ícono azul Bootstrap
    },
    {
      label: "Eliminar",
      icon: "pi pi-times text-danger", // Ícono rojo Bootstrap
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <SplitButton label="Acciones" model={items} />
    </div>
  );
}