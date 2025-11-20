import * as yup from "yup";

const SchemaValidationSalida = yup.object({
  documento: yup
    .string()

    .required("El documento es obligatorio"),

  // tipoDocumento: yup
  //   .string()
  //   .oneOf(["cc", "ti","otro"], "Tipo de documento inválido")
  //   .required("Selecciona el tipo de documento"),

  tipoIngreso: yup
    .string()
    .nullable()
    .notRequired()
    .test("is-valid", "Tipo de vehiculo inválido", (value) => {
      return !value || ["conVehiculo", "sinVehiculo"].includes(value);
    }),
});

export default SchemaValidationSalida;
