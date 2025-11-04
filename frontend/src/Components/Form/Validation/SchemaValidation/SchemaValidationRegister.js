import * as yup from "yup";

const SchemaValidationRegister = yup.object({
  documento: yup
    .string()
    .matches(/^\d{10}$/, "Documento inválido")
    .required("El documento es obligatorio"),

  tipoDocumento: yup
    .string()
    .oneOf(["cc", "ti","otro"], "Tipo de documento inválido")
    .required("Selecciona el tipo de documento"),

  tipoIngreso: yup
    .string()
    .oneOf(["conVehiculo", "sinVehiculo"], "Tipo de vehiculo inválido")
    .required("Selecciona el tipo de vehiculo"),
});

export default SchemaValidationRegister;
