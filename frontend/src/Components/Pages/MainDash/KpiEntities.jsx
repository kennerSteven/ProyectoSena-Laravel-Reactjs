import KpiCards from "./MainDashboard";

/* GYM */
export function KpiGym() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidagym/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidagym/index"}
    />
  );
}

/* GRANJA */
export function KpiGRANJA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidagranja/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidagranja/index"}
    />
  );
}

/* SENA (CATA) */
export function KpiCATA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidaSENA/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidaSENA/index"}
    />
  );
}

/* CASA DE APOYO */
export function KpiCASA() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidacasa/index"}
      urlSalida={"http://localhost:8000/api/entradaysalidacasa/index"}
    />
  );
}
