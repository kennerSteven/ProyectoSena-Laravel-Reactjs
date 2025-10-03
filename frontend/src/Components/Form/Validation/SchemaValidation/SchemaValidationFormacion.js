import * as yup from "yup";

const SchemaValidationFormacion = yup.object({
  numeroFicha: yup.string().required("La ficha es obligatoria"),
  nombrePrograma: yup
    .string()
    .required("El nombre de formación es obligatorio"),

  jornada: yup
    .string()
    .oneOf(["mañana", "tarde", "noche"], "Selecciona una jornada valida")
    .required("La jornada es obligatoria"),


     estado: yup
    .string()
    .oneOf(["activo", "inactivo",], "Selecciona un estado ")
    .required("el estado es obligatorio"),
});

export default SchemaValidationFormacion;
