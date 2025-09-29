import * as yup from "yup";

const SchemaValidationLogin = yup.object({
  usuario: yup.string().required("El usuario es requerido"),

  contrasena: yup.string().required("Contraseña requerida"),
});

export default SchemaValidationLogin;
