export const ItemsConfig = [
  {
    iconClass: "pi pi-home",
    nameItem: "Inicio",
    link: "/Dashboard/inicio",
  },
  {
    iconClass: "pi pi-users",
    nameItem: "Perfiles",
    link: "/Dashboard/TipoUsuario",
  },

  {
    nameItem: "Aprendices",
    iconClass: "pi pi-user",
    link: "/Dashboard/ListarAprendiz",
  },
  {
    nameItem: "Instructor",
    iconClass: "pi pi-id-card",
    link: "/Dashboard/ListarInstructor",
  },
  {
    nameItem: "Visitante",
    iconClass: "pi pi-user",
    link: "/Dashboard/ListarVisitante",
  },
  {
    nameItem: "Administrativo",
    iconClass: "pi pi-briefcase",
    link: "/Dashboard/ListarAdministrativo",
  },

  {
    iconClass: "pi pi-history",
    nameItem: "Historial",
    link: "/Dashboard/Historial",
  },

  { type: "divider" },

  {
    iconClass: "pi pi-shield",
    nameItem: "Vigilantes",
    link: "/Dashboard/Vigilantes",
  },
  {
    iconClass: "pi pi-sign-out",
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
  { field: "fechaRegistro", header: "Fecha de Registro" }, // ✅ agregado
];

export const nameValueAprendiz = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "tipoPerfil", header: "Perfil" },
  { field: "numeroDocumento", header: "Documento" },
  { field: "telefono", header: "Teléfono" },
  { field: "tipoSangre", header: "Tipo de Sangre" },
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
