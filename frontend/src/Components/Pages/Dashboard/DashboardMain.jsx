import Dashboard from "../../Layout/Dashboard";

export function DashboardCata() {
  return (
    <Dashboard nameTopBar="CATA" nameAdmin="unknown Admin" showEntrada={true} />
  );
}

export function DashboardGym() {
  return (
    <Dashboard nameTopBar="Gym" nameAdmin="unknown Admin" showEntrada={false} />
  );
}

export function DashboardGranja() {
  return (
    <Dashboard
      nameTopBar="Granja"
      nameAdmin="unknown Admin"
      showEntrada={true}
      // getEntradaGranja={fetchGetEntradaGranja}
    />
  );
}

export function DashboardCasaApoyo() {
  return (
    <Dashboard
      nameTopBar="Casa de apoyo"
      nameAdmin="unknown Admin"
      showEntrada={false}
    />
  );
}
