export const ItemsConfig = [
  {
    iconClass: "pi pi-home",
    nameItem: "Inicio",
    link: "/Dashboard",
  },
  {
    iconClass: "pi pi-users",
    nameItem: "Perfiles",
    link: "/Dashboard/TipoUsuario",
  },

  {
    iconClass: "pi pi-user-plus",
    nameItem: "Crear Usuarios",
    subItems: [
      {
        label: "Instructor",
        icon: "pi pi-id-card",
        link: "/Dashboard/CrearInstructor",
      },
      {
        label: "Aprendiz",
        icon: "pi pi-user",
        link: "/Dashboard/CrearAprendiz",
      },
      {
        label: "Administrativo",
        icon: "pi pi-briefcase",
        link: "/Dashboard/CrearAdministrativo",
      },
    ],
  },

  {
    iconClass: "pi pi-list",
    nameItem: "Listar",
    subItems: [
      {
        label: "Aprendices",
        icon: "pi pi-user",
        link: "/Dashboard/ListarAprendiz",
      },
      {
        label: "Instructor",
        icon: "pi pi-id-card",
        link: "/Dashboard/ListarInstructor",
      },
      {
        label: "Visitante",
        icon: "pi pi-user",
        link: "/Dashboard/ListarVisitante",
      },
      {
        label: "Administrativo",
        icon: "pi pi-briefcase",
        link: "/Dashboard/ListarAdministrativo",
      },
    ],
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

export const nameValueAprendiz = [
  "Id",
  "Nombre",
  "Apellido",
  "Tipo perfil",
  "Formación",
  "Tipo Documento",
  "Numero Documento",
  "Telefono",
  "Tipo sangre",
  "Estado",
  "Fecha registro",
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


// Datos de ejemplo para Instructor
export const dataInstructor = [
  {
    Id: 1,
    Nombre: "Juan",
    Apellido: "Pérez",
    "Tipo perfil": "Instructor",
    "Tipo Documento": "CC",
    "Numero Documento": "123456789",
    Telefono: "3001234567",
    "Tipo sangre": "O+",
    Estado: "Activo",
    "Fecha registro": "2025-10-01",
  },
  {
    Id: 2,
    Nombre: "Ana",
    Apellido: "Gómez",
    "Tipo perfil": "Instructor",
    "Tipo Documento": "TI",
    "Numero Documento": "987654321",
    Telefono: "3007654321",
    "Tipo sangre": "A-",
    Estado: "Activo",
    "Fecha registro": "2025-09-20",
  },
];

// Datos de ejemplo para Aprendiz
export const dataAprendiz = [
  {
    Id: 1,
    Nombre: "Carlos",
    Apellido: "Ramírez",
    "Tipo perfil": "Aprendiz",
    Formación: "ADSO  2929185",
    "Tipo Documento": "CC",
    "Numero Documento": "111222333",
    Telefono: "3001112223",
    "Tipo sangre": "B+",
    Estado: "Activo",
    "Fecha registro": "2025/08/15",
  },
];

// Datos de ejemplo para Visitante
export const dataVisitante = [
  {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
    {
    Id: 1,
    Nombre: "Lucía",
    Apellido: "Martínez",
    "Tipo perfil": "Visitante",
    "Tipo Documento": "CC",
    "Numero Documento": "444555666",
    Telefono: "3004445556",
    "Tipo sangre": "AB+",
    Estado: "Inactivo",
    "Fecha registro": "2025-07-10",
  },
];

// Datos de ejemplo para Administrativo
export const dataAdministrativo = [
  {
    Id: 1,
    Nombre: "Sofía",
    Apellido: "López",
    "Tipo perfil": "Administrativo",
    "Tipo Documento": "CC",
    "Numero Documento": "777888999",
    Telefono: "3007778889",
    "Tipo sangre": "O-",
    Estado: "Activo",
    "Fecha registro": "2025-06-05",
  },
];
