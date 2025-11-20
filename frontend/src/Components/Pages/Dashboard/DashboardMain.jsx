import Dashboard from "../../Layout/Dashboard";

import {
  getRegisters,
  createRegister,
  createSalida,
  createRegisterGranja,
  getRegistersGranja,
  createRegisterSalidaGranja,
} from "../../Services/FetchServices";

export function DashboardCata() {
  return (
    <Dashboard
      showConVehiculoSalida={false}
      nameTopBar="CATA"
      showColumnaIngreso={false}
      showPlaca={false}
      nameAdmin="unknown Admin"
      showEntrada={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidaSENA/index"
      )}
      createRegister={createRegister(
        "http://localhost:8000/api/entradaysalidaSENA/entradasena"
      )}
      createSalida={createSalida(
        "http://localhost:8000/api/entradaysalidaSENA/salidasena"
      )}
    />
  );
}

export function DashboardGym() {
  return (
    <Dashboard
      showConVehiculoSalida={false}
      nameTopBar="Gym"
      nameAdmin="unknown Admin"
      showColumnaIngreso={false}
      showEntrada={false}
      showPlaca={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidagym/index"
      )}
      createRegister={createRegister(
        "http://localhost:8000/api/entradaysalidagym/entradagym"
      )}
      createSalida={createSalida(
        "http://localhost:8000/api/entradaysalidagym/salidagym"
      )}
    />
  );
}

export function DashboardCasaApoyo() {
  return (
    <Dashboard
      showConVehiculoSalida={false}
      nameTopBar="Casa de apoyo"
      nameAdmin="unknown Admin"
      showColumnaIngreso={false}
      showPlaca={false}
      showEntrada={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidacasa/index"
      )}
      createRegister={createRegister(
        "http://localhost:8000/api/entradaysalidacasa/entradacasadeapoyo"
      )}
      createSalida={createSalida(
        "http://localhost:8000/api/entradaysalidacasa/salidacasadeapoyo"
      )}
    />
  );
}

export function DashboardGranja() {
  return (
    <Dashboard
      showConVehiculoSalida={true}
      showPlaca={true}
      nameTopBar="Granja"
      showColumnaIngreso={true}
      nameAdmin="unknown Admin"
      showEntrada={true}
      getRegisters={getRegistersGranja}
      createRegister={createRegisterGranja(
        "http://localhost:8000/api/entradaysalidagranja/entradagranja"
      )}
      createSalida={createRegisterSalidaGranja}
    />
  );
}
