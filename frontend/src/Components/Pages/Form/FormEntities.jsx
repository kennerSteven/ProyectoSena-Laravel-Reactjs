import SchemaValidationUser from "../../Form/Validation/SchemaValidation/SchemaValidationUser";
import { useInstructorForm } from "../../Form/Validation/HandleValidation/useHandle";
import Form from "../../Form/Form";
import SchemaValidationInstructor from "../../Form/Validation/SchemaValidation/SchemaValidationInstructor";

export function FormAdministrativo({closeModalFunction}) {





  return (
 <div>
     <Form
      SchemaValidation={SchemaValidationUser}
      handleValidation={useInstructorForm}
      nameForm="Crear nuevo Administrativo"
      tipoPerfilValue="Instructor"
      closeModal={closeModalFunction}
    />
 </div>
  );
}


export function FormInstructor({closeModalFunction}) {




  return (
    <Form
      SchemaValidation={SchemaValidationInstructor}
      handleValidation={useInstructorForm}
      nameForm="Crear  Instructor"
      tipoPerfilValue="Instructor"
       closeModal={closeModalFunction}
    />
  );
}
