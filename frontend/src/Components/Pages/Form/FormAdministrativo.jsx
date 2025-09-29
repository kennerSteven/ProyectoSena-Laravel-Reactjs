import useHandleValidationUser from "../../Form/Validation/HandleValidation/HandleValidationUser";
import SchemaValidationUser from "../../Form/Validation/SchemaValidation/SchemaValidationUser";
import Form from "../../Form/Form";
export default function FormAdministrativo() {
  return (
    <>
      <Form
        SchemaValidation={SchemaValidationUser}
        handleValidation={useHandleValidationUser}
        FormName="Crear nuevo administrativo"
      />
    </>
  );
}
