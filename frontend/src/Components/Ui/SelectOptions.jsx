export default function SelectOptions({
  register,
  name,
  nameSelect,
  error,
  values = [],
  defaultValue = "",
}) {
  return (
    <div style={{ width: "100%" }}>
      <label className="form-label">{nameSelect}</label>
      <select
        {...register(name)}
        defaultValue={defaultValue}
        className={`form-select shadow-sm ${error ? "is-invalid" : ""}`}
      >
        {defaultValue === "" && (
          <option value="" disabled>
            {" "}
            Seleccionar opción{" "}
          </option>
        )}

        {values.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
