export const ItemsConfigGranja = [
  { iconClass: "pi pi-home", link: "/dashboardgranja/inicio", label: "Inicio" },
  {
    iconClass: "pi pi-users",
    label: "Aprendices",
    link: "/dashboardgranja/listaraprendiz",
  },
  {
    iconClass: "pi pi-book",
    label: "Formaciones",
    link: "/dashboardgranja/formaciones",
  },
  {
    iconClass: "pi pi-user-edit",
    label: "Instructor",
    link: "/dashboardgranja/listarinstructor",
  },
  {
    iconClass: "pi pi-user-plus",
    label: "Visitante",
    link: "/dashboardgranja/listarvisitante",
  },
  {
    iconClass: "pi pi-briefcase",
    label: "Administrativo",
    link: "/dashboardgranja/listaradministrativo",
  },
  { type: "divider" },
  {
    iconClass: "pi pi-question-circle",
    label: "Información",
    link: "/dashboardgranja/vigilantes",
  },
];
export const ItemsConfigCata = [
  { iconClass: "pi pi-home", link: "/dashboardcata/inicio", label: "Inicio" },
  {
    iconClass: "pi pi-users",
    label: "Aprendices",
    link: "/dashboardcata/listaraprendiz",
  },
  {
    iconClass: "pi pi-book",
    label: "Formaciones",
    link: "/dashboardcata/formaciones",
  },
  {
    iconClass: "pi pi-user-edit",
    label: "Instructor",
    link: "/dashboardcata/listarinstructor",
  },
  {
    iconClass: "pi pi-briefcase",
    label: "Administrativo",
    link: "/dashboardcata/listaradministrativo",
  },
  {
    iconClass: "pi pi-user-plus",
    label: "Visitante",
    link: "/dashboardcata/listarvisitante",
  },
  { type: "divider" },
  {
    iconClass: "pi pi-question-circle",
    label: "Información",
    link: "/dashboardcata/vigilantes",
  },
];
export const ItemsConfigCasaApoyo = [
  { iconClass: "pi pi-home", link: "/dashboardcasa/inicio", label: "Inicio" },
  {
    iconClass: "pi pi-users",
    label: "Aprendices",
    link: "/dashboardcasa/listaraprendiz",
  },
  {
    iconClass: "pi pi-book",
    label: "Formaciones",
    link: "/dashboardcasa/formaciones",
  },
  {
    iconClass: "pi pi-user-edit",
    label: "Instructor",
    link: "/dashboardcasa/listarinstructor",
  },
  {
    iconClass: "pi pi-briefcase",
    label: "Administrativo",
    link: "/dashboardcasa/listaradministrativo",
  },
  {
    iconClass: "pi pi-user-plus",
    label: "Visitante",
    link: "/dashboardcasa/listarvisitante",
  },
  { type: "divider" },
  {
    iconClass: "pi pi-question-circle",
    label: "Información",
    link: "/dashboardcasa/vigilantes",
  },
];
export const getItemsConfigByDashboard = (dashboard) => {
  const prefix = `/dashboard${dashboard.toLowerCase()}`;
  return [
    { iconClass: "pi pi-home", link: `${prefix}/inicio`, label: "Inicio" },
    {
      iconClass: "pi pi-users",
      label: "Aprendices",
      link: `${prefix}/listaraprendiz`,
    },
    {
      iconClass: "pi pi-book",
      label: "Formaciones",
      link: `${prefix}/formaciones`,
    },
    {
      iconClass: "pi pi-user-edit",
      label: "Instructor",
      link: `${prefix}/listarinstructor`,
    },
    {
      iconClass: "pi pi-user-plus",
      label: "Visitante",
      link: `${prefix}/listarvisitante`,
    },
    {
      iconClass: "pi pi-briefcase",
      label: "Administrativo",
      link: `${prefix}/listaradministrativo`,
    },
    { type: "divider" },
    {
      iconClass: "pi pi-question-circle",
      label: "Información ",
      link: `${prefix}/vigilantes`,
    },
  ];
};

export const getItemsConfig = (dashboardPrefix) => [
  {
    iconClass: "pi pi-home",
    link: `${dashboardPrefix}/inicio`,
    label: "Inicio",
  },
  {
    iconClass: "pi pi-users",
    label: "Aprendices",
    link: `${dashboardPrefix}/listaraprendiz`,
  },
  {
    iconClass: "pi pi-book",
    label: "Formaciones",
    link: `${dashboardPrefix}/formaciones`,
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
    iconClass: "pi pi-briefcase",
    label: "Administrativo",
    link: `${dashboardPrefix}/listaradministrativo`,
  },
  { type: "divider" },
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
  { field: "fechaRegistro", header: "Fecha de Registro" }, // ✅ agregado
];
