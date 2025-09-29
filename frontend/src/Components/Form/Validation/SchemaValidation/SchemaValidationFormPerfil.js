import * as yup from "yup";
import { TipoPerfil } from "../../../Layout/Data";

const SchemaValidationFormPerfil = yup.object({
  descripcion: yup.string().required("La descripción es obligatoria"),

  TipoPerfil: yup.string().oneOf(["Aprendiz", "Instructor", "Visitante"]),
});

export default SchemaValidationFormPerfil;
