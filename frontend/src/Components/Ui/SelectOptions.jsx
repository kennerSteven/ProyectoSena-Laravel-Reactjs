export default function SelectOptions({
  register,
  name,
  nameSelect,
  error,
  values = [],
  defaultValue = "",
  showEntrada = true,
}) {
  if (!showEntrada) return null; // ✅ oculta el campo si no se debe mostrar

  return (
    <div style={{ width: "100%" }}>
      <label className="form-label label">{nameSelect}</label>
      <select
        {...register(name)}
        defaultValue={defaultValue}
        className={`input form-select shadow-sm ${error ? "is-invalid" : ""}`}
      >
        {defaultValue === "" && (
          <option className="optionItem" value="" disabled>
            Seleccione
          </option>
        )}

        {values.map(({ value, label }) => (
          <option className="optionItem" key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
