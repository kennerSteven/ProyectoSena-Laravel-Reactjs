import { AutoComplete } from "primereact/autocomplete";
import "../../styles/InputField.css";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function InputAutoComplete({
  objFormacion,
  name,
  control,
  label,
}) {
  const [valorItem, setValorItem] = useState([]);

  const search = (e) => {
    const q = e.query.toLowerCase();
    const filtered = objFormacion.filter((f) =>
      f.label.toLowerCase().includes(q)
    );
    setValorItem(filtered);
  };

  return (
    <div className="input-autocomplete">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => (
          <>
            <AutoComplete
              id={name}
              dropdown
              value={field.value} // 👈 guarda el objeto completo
              suggestions={valorItem}
              completeMethod={search}
              onChange={(e) => field.onChange(e.value)} // 👈 guarda el objeto completo
              field="label"
              placeholder="Buscar ficha"
              className={`w-100 ${fieldState?.error ? "p-invalid" : ""}`}
              itemTemplate={(item) =>
                item ? (
                  <div className="d-flex align-items-center gap-2">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <span className="text-muted">—</span>
                )
              }
              valueTemplate={(item) =>
                item ? (
                  <div className="d-flex align-items-center gap-2">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </div>
                ) : (
                  ""
                )
              }
            />
            {fieldState.error && (
              <p className="p-error">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
