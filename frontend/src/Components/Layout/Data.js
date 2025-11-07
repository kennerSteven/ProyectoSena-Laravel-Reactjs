export const ItemsConfig = [
  {
    iconClass: "pi pi-home", // Inicio institucional
    nameItem: "Inicio",
    link: "/Dashboard/inicio",
  },
  {
    iconClass: "pi pi-users", // Grupo de personas
    nameItem: "Aprendices",
    link: "/Dashboard/ListarAprendiz",
  },
  {
    iconClass: "pi pi-book", // Contenido académico
    nameItem: "Formaciones",
    link: "/Dashboard/Formaciones",
  },
  {
    iconClass: "pi pi-user-edit", // Rol activo de enseñanza
    nameItem: "Instructor",
    link: "/Dashboard/ListarInstructor",
  },
  {
    iconClass: "pi pi-user-plus", // Usuario externo
    nameItem: "Visitante",
    link: "/Dashboard/ListarVisitante",
  },
  {
    iconClass: "pi pi-briefcase", // Gestión administrativa
    nameItem: "Administrativo",
    link: "/Dashboard/ListarAdministrativo",
  },

  { type: "divider" },

  {
    iconClass: "pi pi-shield", // Seguridad institucional
    nameItem: "Vigilantes",
    link: "/Dashboard/Vigilantes",
  },
  {
    iconClass: "pi pi-sign-out", // Cierre de sesión
    nameItem: "Cerrar sesión",
    link: "/logout",
  },
];
export const TipoPerfil = [
  { value: "Aprendiz", label: "Aprendiz" },
  { value: "Instructor", label: "Instructor" },
  { value: "Visitante", label: "Visitante" },
];

export const nameValueInstructor = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "tipoPerfil", header: "Perfil" },
  { field: "numeroDocumento", header: "Documento" },
  { field: "telefono", header: "Teléfono" },
  { field: "fechaRegistro", header: "Fecha registro" }, // ✅ agregado
];

export const nameValueAprendiz = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },

  { field: "numeroDocumento", header: "Documento" },
  { field: "telefono", header: "Teléfono" },

  { field: "nombrePrograma", header: "Formación" },
  { field: "jornada", header: "Jornada" },
  { field: "tipoSangre", header: " Sangre" },
  { field: "fechaRegistro", header: "Fecha de Registro" }, // ✅ agregado
];
export const nameValueVisitante = [
  "Id",
  "Nombre",
  "Apellido",
  "Tipo perfil",
  "Tipo Documento",
  "Numero Documento",
  "Telefono",
  "Tipo sangre",
  "Estado",
  "Fecha registro",
];
export const nameValueAdministrativo = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "tipoPerfil", header: "Perfil" },
  { field: "numeroDocumento", header: "Documento" },
  { field: "telefono", header: "Teléfono" },
  { field: "tipoSangre", header: "Tipo de Sangre" },
  { field: "fechaRegistro", header: "Fecha de Registro" }, // ✅ agregado
];
