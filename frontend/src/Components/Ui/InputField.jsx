import "../../styles/InputField.css";

export default function InputField({
  typeIntput,
  name,
  register,
  error,
  placeholder,
  labelName,
  disabled = false,
}) {
  return (
    <div style={{ width: "100%" }}>
      <label className="form-label label">{labelName}</label>
      <input
        disabled={disabled}
        type={typeIntput}
        {...register(name)}
        className={` input form-control w-100 w-sm-50 w-md-40  ${
          error ? "is-invalid" : ""
        }`}
        placeholder={placeholder}
      />

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}
