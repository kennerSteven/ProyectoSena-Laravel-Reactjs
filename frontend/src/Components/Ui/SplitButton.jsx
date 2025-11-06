import "primeicons/primeicons.css";
import "../../styles/SplitButton.css";

export default function SplitButtonComp({ rowData, onEdit, onDelete }) {
  return (
    <div className="d-flex gap-3">
      <button
        className="btnActionIconDelete"
        title="Editar"
        onClick={() => onEdit(rowData)}
      >
        <i className="pi pi-pencil" style={{ fontSize: "1.2rem" }} />
      </button>

      <button
        className=" btnActionIconUpdate"
        title="Eliminar"
        onClick={() => onDelete(rowData)}
      >
        <i className="pi pi-trash" />
      </button>
    </div>
  );
}
