import * as yup from "yup";

const SchemaValidationInstructor = yup.object({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "Mínimo 2 caracteres"),

  apellido: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "Mínimo 2 caracteres"),

  telefono: yup
    .string()
    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .required("El teléfono es obligatorio"),

  tipoDocumento: yup
    .string()
    .oneOf(["cc", "cc"], "Tipo de documento inválido")
    .required("Selecciona el tipo de documento"),

  numeroDocumento: yup
    .string()
    .matches(/^\d{6,10}$/, "Documento inválido")
    .required("El documento es obligatorio"),

  tipoSangre: yup
    .string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Tipo de sangre inválido"
    )
    .required("Selecciona el tipo de sangre"),
tipoPerfil: yup
  .number()
  .transform((value, originalValue) =>
    String(originalValue).trim() === "" ? undefined : value
  )
  .required("El tipo de perfil es obligatorio"),
});

export default SchemaValidationInstructor;
