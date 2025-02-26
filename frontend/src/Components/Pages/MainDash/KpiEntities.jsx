// KpiExports.js

import KpiCards from "./MainDashboard";

/* URL de la API de vehículos que es común a algunas entidades */
const URL_VEHICULOS = "http://localhost:8000/api/entradastipovehiculo";

export function KpiGym() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidagym/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidagym/index"}
      urlBarchar={"http://localhost:8000/api/gym/entradapormes"}
      // 🟢 URL para PERFILES
    urlDoughnut={"http://localhost:8000/api/gym/entradaperfile"}
    />
  );
}

/* GRANJA */
export function KpiGRANJA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidagranja/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidagranja/index"}
      urlBarchar={"http://localhost:8000/api/granja/entradapormes"}
      // 🟢 URL para VEHÍCULOS
      urlDoughnut={"http://localhost:8000/api/entradastipovehiculo"}
    />
  );
}

/* SENA (CATA) */
export function KpiCATA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidaSENA/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidaSENA/index"}
      urlBarchar={"http://localhost:8000/api/sena/entradapormes"}
      // 🟢 URL para VEHÍCULOS
      urlDoughnut={"http://localhost:8000/api/sena/entradaperfile"}
    />
  );
}

/* CASA DE APOYO */
export function KpiCASA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidacasa/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidacasa/index"}
      urlBarchar={"http://localhost:8000/api/casadeapoyo/entradapormes"}
      // 🟢 URL para PERFILES
      urlDoughnut={"http://localhost:8000/api/casadeapoyo/entradaperfile"}
    />
  );
}
