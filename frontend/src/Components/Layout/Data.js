export const getItemsConfig = (dashboardPrefix) => [
  {
    iconClass: "pi pi-home",
    link: `${dashboardPrefix}/inicio`,
    label: "Inicio",
  },
  {
    iconClass: "pi pi-briefcase",
    label: "Administrativo",
    link: `${dashboardPrefix}/listaradministrativo`,
  },
  {
    iconClass: "pi pi-users",
    label: "Aprendices",
    link: `${dashboardPrefix}/listaraprendiz`,
  },
  {
    iconClass: "pi pi-user-edit",
    label: "Instructor",
    link: `${dashboardPrefix}/listarinstructor`,
  },
  {
    iconClass: "pi pi-user-plus",
    label: "Visitante",
    link: `${dashboardPrefix}/listarvisitante`,
  },
  {
    iconClass: "pi pi-id-card",
    label: "Perfiles",
    link: `${dashboardPrefix}/perfiles`,
  },
  {
    iconClass: "pi pi-book",
    label: "Formaciones",
    link: `${dashboardPrefix}/formaciones`,
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
  { field: "fechaRegistro", header: "Fecha registro" },
];

export const nameValueAprendiz = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "numeroDocumento", header: "Documento" },
  { field: "telefono", header: "Teléfono" },
  { field: "numeroFicha", header: "Ficha" },
  { field: "nombrePrograma", header: "Formación" },
  { field: "jornada", header: "Jornada" },
  { field: "tipoSangre", header: " Sangre" },
  { field: "fechaRegistro", header: "Fecha de Registro" },
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
  { field: "fechaRegistro", header: "Fecha de Registro" },
];
