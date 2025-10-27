import * as yup from "yup";

const SchemaValidationFormPerfil = yup.object({
tipoPerfil: yup.string().required("El nombre del perfil es obligatorio"),
descripcion: yup.string().required("La descripción es obligatoria"),
  
});

export default SchemaValidationFormPerfil;
