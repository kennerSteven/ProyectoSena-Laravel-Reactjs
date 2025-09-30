import SchemaValidationUser from "../../Form/Validation/SchemaValidation/SchemaValidationUser";
import {
  useAdministrativoForm,
  useAprendizForm,
  useInstructorForm,
} from "../../Form/Validation/HandleValidation/useHandle";
import Form from "../../Form/Form";

// Formulario Administrativo
export function FormAdministrativo() {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useAdministrativoForm}
      FormName="Crear nuevo administrativo"
    />
  );
}

// Formulario Perfil

// Formulario Instructor
export function FormInstructor() {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useInstructorForm}
      FormName="Crear nuevo instructor"
    />
  );
}

// Formulario Aprendiz
export function FormAprendiz() {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useAprendizForm}
      FormName="Crear nuevo aprendiz"
    />
  );
}
