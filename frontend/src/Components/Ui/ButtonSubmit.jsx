import "../../styles/ButtonSubmit.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ButtonSubmit({
  textSend,
  isSubmitting,
  textSending,
  disabled,
  maxWidth = false,
  iconButton,
}) {
  return (
    <div className="btn-container">
      <button
      
        type="submit"
        className={`d-flex gap-2 align-items-center ${
          disabled ? "btnDisabled" : "Btn"
        } ${maxWidth ? "btnMaxWidth " : ""}`}
        disabled={disabled || isSubmitting}
      >
        <i className={iconButton}></i>
        {isSubmitting ? textSending : textSend}
      </button>
    </div>
  );
}
