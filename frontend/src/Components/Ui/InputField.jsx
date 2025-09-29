export default function InputField({
  typeIntput,
  name,
  register,
  error,
  placeholder,
  labelName,
}) {
  return (
    <div style={{ width: "100%" }}>
      <label className="form-label ">{labelName}</label>
      <input
        type={typeIntput}
        {...register(name)}
        className={`form-control  ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
      />

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
