import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function InputAutoComplete({ objFormacion, name, control }) {
  const [valorItem, setValorItem] = useState([]);

  const search = (e) => {
    const q = e.query.toLowerCase();
    setValorItem(
      objFormacion.filter((f) =>
        Object.values(f).some((v) => v.toLowerCase().includes(q))
      )
    );
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={null} // <-- MUY IMPORTANTE
        render={({ field, fieldState }) => (
          <AutoComplete
            {...field}
            suggestions={valorItem}
            completeMethod={search}
            onChange={(e) => field.onChange(e.value)}
            field="nombreFicha"
            placeholder="Buscar ficha"
            className={fieldState?.error ? "p-invalid" : ""}
            itemTemplate={(item) => (
              <span>
                {item.nombreFicha} - {item.jornada} - {item.numeroFicha}
              </span>
            )}
            valueTemplate={(item) =>
              item ? `${item.numeroFicha} - ${item.nombreFicha}` : ""
            }
          />
        )}
      />
    </div>
  );
}
