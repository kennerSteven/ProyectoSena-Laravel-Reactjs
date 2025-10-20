import SchemaValidationUser from "../../Form/Validation/SchemaValidation/SchemaValidationUser";
import { useInstructorForm } from "../../Form/Validation/HandleValidation/useHandle";
import Form from "../../Form/Form";

// Formulario Administrativo
export function FormAdministrativo({closeModalFunction}) {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useInstructorForm}
      nameForm="Crear nuevo Administrativo"
      tipoPerfilValue="Instructor"
      closeModal={closeModalFunction}
    />
  );
}

// Formulario Perfil

// Formulario Instructor
export function FormInstructor({closeModalFunction}) {
  return (
    <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useInstructorForm}
      nameForm="Crear  Instructor"
      tipoPerfilValue="Instructor"
       closeModal={closeModalFunction}
    />
  );
}

// Formulario Aprendiz
