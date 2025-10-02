import SchemaValidationUser from "../../Form/Validation/SchemaValidation/SchemaValidationUser";
import {
  useAdministrativoForm,
  useInstructorForm,
} from "../../Form/Validation/HandleValidation/useHandle";
import Form from "../../Form/Form";

// Formulario Administrativo
export function FormAdministrativo() {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useInstructorForm}
      nameForm="Crear nuevo Administrativo"
      tipoPerfilValue="Instructor"
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
      nameForm="Crear  Instructor"
      tipoPerfilValue="Instructor"
    />
  );
}

// Formulario Aprendiz
