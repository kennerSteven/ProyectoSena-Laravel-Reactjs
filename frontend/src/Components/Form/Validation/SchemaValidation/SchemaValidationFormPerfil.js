import * as yup from "yup";

const SchemaValidationFormPerfil = yup.object({
  caracteristica: yup.string().required("La descripción es obligatoria"),

  tipoPerfil: yup
    .string()
    .oneOf(
      ["Aprendiz", "Instructor", "Visitante"],
      "Selecciona un perfil válido"
    )
    .required("Este campo es obligatorio"),
});

export default SchemaValidationFormPerfil;
