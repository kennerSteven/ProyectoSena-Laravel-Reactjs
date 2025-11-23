import KpiCards from "./MainDashboard";

/* GYM */
export function KpiGym() {
  return (
    <KpiCards
      urlEntrada={"http://localhost:8000/api/entradaysalidagym/entradagym"}
      urlSalida={"http://localhost:8000/api/entradaysalidagym/salidagym"}
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
      urlEntrada={"http://localhost:8000/api/entradaysalidaSENA/entradasena"}
      urlSalida={"http://localhost:8000/api/entradaysalidaSENA/salidasena"}
    />
  );
}

/* CASA DE APOYO */
export function KpiCASA() {
  return (
    <KpiCards
      urlEntrada={
        "http://localhost:8000/api/entradaysalidacasa/entradacasadeapoyo"
      }
      urlSalida={
        "http://localhost:8000/api/entradaysalidacasa/salidacasadeapoyo"
      }
    />
  );
}
