import * as yup from "yup";

const SchemaFicha = yup.object({
  numeroFicha: yup
    .string()
    .matches(/^\d+$/, "La ficha debe contener solo números")
    .required("El número de ficha es obligatorio"),

  nombreFormacion: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre de la formación es obligatorio"),

  jornada: yup
    .string()
    .oneOf(["mañana", "tarde", "noche"], "Selecciona una jornada válida")
    .required("La jornada es obligatoria"),
});

export default SchemaFicha;
