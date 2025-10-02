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
    setValorItem(
      objFormacion.filter((f) =>
        Object.values(f).some((v) => String(v).toLowerCase().includes(q))
      )
    );
  };

  return (
    <div className="input-autocomplete">
      <label className="form-label"  htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => (
          <>
            <AutoComplete
              id={name}
              dropdown
              value={field.value}
              suggestions={valorItem}
              completeMethod={search}
              onChange={(e) => field.onChange(e.value)}
              field="nombreFicha"
              placeholder="Buscar ficha"
              className={`w-100 ${fieldState?.error ? "p-invalid" : ""}`}
              itemTemplate={(item) =>
                item ? (
                  <span>
                    {item.nombreFicha} - {item.jornada} - {item.numeroFicha}
                  </span>
                ) : null
              }
              valueTemplate={(item) =>
                item ? `${item.numeroFicha} - ${item.nombreFicha}` : ""
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
