export const ItemsConfig = [
  {
    iconClass: "pi pi-home",
    nameItem: "Inicio",
    link: "/Dashboard",
  },
  {
    iconClass: "pi pi-users",
    nameItem: "Tipo de Usuario",
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
        link: "/Dashboard/RegistroEntrada",
      },
      {
        label: "Instructor",
        icon: "pi pi-id-card",
        link: "/Dashboard/RegistroEntrada",
      },
      {
        label: "Visitante",
        icon: "pi pi-user",
        link: "/Dashboard/RegistroEntrada",
      },
      {
        label: "Administrativo",
        icon: "pi pi-briefcase",
        link: "/Dashboard/RegistroSalida",
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
