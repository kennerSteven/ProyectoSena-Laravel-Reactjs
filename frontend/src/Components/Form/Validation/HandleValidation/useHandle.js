import HandleValidation from "./Component/HandleValidation";

import {
  onSubmitAprendiz,
  onSubmitAdministrativo,
  onSubmitPerfil,
  onSubmitInstructor,
  onSubmitFoormacion,
} from "../../../Services/FetchServices";

// Administrativo
export function useAdministrativoForm(reset) {
  const { onSubmit, onError, formData } = HandleValidation({
    toastLoading: "Guardando administrativo...",
    toastSuccess: "Administrador creado con éxito",
    toastErrorServer: "Error al crear administrador",
    toastErrorInput: "Por favor revisa los campos",
    reset,
    FetchFuncion: onSubmitAdministrativo,
  });
  return { onSubmit, onError, formData };
}

// Aprendiz
export function useAprendizForm(reset) {
  const { onSubmit, onError, formData } = HandleValidation({
    toastLoading: "Guardando aprendiz...",
    toastSuccess: "Aprendiz creado con éxito",
    toastErrorServer: "Error al crear aprendiz",
    toastErrorInput: "Por favor revisa los campos",
    reset,
    FetchFuncion: onSubmitAprendiz,
  });
  return { onSubmit, onError, formData };
}

// Instructor
export function useInstructorForm(reset) {
  const { onSubmit, onError, formData } = HandleValidation({
    toastLoading: "Guardando instructor...",
    toastSuccess: "Instructor creado con éxito",
    toastErrorServer: "Error al crear instructor",
    toastErrorInput: "Por favor revisa los campos",
    reset,
    FetchFuncion: onSubmitInstructor,
  });
  return { onSubmit, onError, formData };
}

// Perfil
export function usePerfilForm(reset) {
  const { onSubmit, onError, formData } = HandleValidation({
    toastLoading: "Guardando perfil...",
    toastSuccess: "Perfil creado con éxito",
    toastErrorServer: "Error al crear perfil",
    toastErrorInput: "Por favor revisa los campos",
    reset,
    FetchFuncion: onSubmitPerfil,
  });
  return { onSubmit, onError, formData };
}

export function useFormacionFOrm(reset) {
  const { onSubmit, onError, formData } = HandleValidation({
    toastLoading: "Guardando perfil...",
    toastSuccess: "Perfil creado con éxito",
    toastErrorServer: "Error al crear perfil",
    toastErrorInput: "Por favor revisa los campos",
    reset,
    FetchFuncion: onSubmitFoormacion,
  });
    return { onSubmit, onError, formData };
}
