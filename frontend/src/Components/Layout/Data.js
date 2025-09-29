export const ItemsConfig = [
  {
    iconClass: "bi bi-house-door-fill",
    nameItem: "Inicio",
    link: "/Dashboard", // ✅ correcto
  },

  {
    iconClass: "bi bi-person-plus-fill",
    nameItem: "Crear Usuarios",
    subItems: [
      {
        label: "Instructor",
        icon: "bi bi-person-badge-fill",
        link: "/Dashboard/CrearInstructor", // ✅ corregido
      },
      {
        label: "Aprendiz",
        icon: "bi bi-person-fill",
        link: "/Dashboard/CrearAprendiz", // ✅ corregido
      },
      {
        label: "Administrativo",
        icon: "bi bi-person-workspace",
        link: "/Dashboard/CrearAdministrativo", // ✅ corregido
      },
    ],
  },

  {
    iconClass: "bi bi-clipboard-data-fill",
    nameItem: "Registro",
    subItems: [
      {
        label: "Entrada",
        icon: "bi bi-box-arrow-in-right",
        link: "/Dashboard/RegistroEntrada", // ✅ corregido
      },
      {
        label: "Salida",
        icon: "bi bi-box-arrow-left",
        link: "/Dashboard/RegistroSalida", // ✅ corregido
      },
    ],
  },

  {
    iconClass: "bi bi-journal-text",
    nameItem: "Historial",
    link: "/Dashboard/Historial", // ✅ corregido
  },

  { type: "divider" },

  {
    iconClass: "bi bi-shield-lock-fill",
    nameItem: "Vigilantes",
    link: "/Dashboard/Vigilantes", // ✅ corregido
  },
  {
    iconClass: "bi bi-box-arrow-right",
    nameItem: "Cerrar sesión",
    link: "/logout", // ✅ esta puede quedarse así si redirige fuera del dashboard
  },
];
