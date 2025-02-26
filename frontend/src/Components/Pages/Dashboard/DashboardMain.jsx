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
  const urlEntrada = "http://localhost:8000/api/entradaysalidaSENA/entradasena";
  const urlSalida = "http://localhost:8000/api/entradaysalidaSENA/salidasena";

  return (
    <Dashboard
      urlEntrada={urlEntrada}
      urlSalida={urlSalida}
      salidaMasiva={"http://localhost:8000/api/sena/salidamasiva"}
      btnSalidaMasiva={true}
      showConVehiculoSalida={false}
      nameTopBar="CATA"
      showColumnaIngreso={false}
      showPlaca={false}
      nameAdmin="unknown Admin"
      showEntrada={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidaSENA/index"
      )}
      createRegister={createRegister(urlEntrada)}
      createSalida={createSalida(urlSalida)}
    />
  );
}

// 🟢 GYM
export function DashboardGym() {
  const urlEntrada = "http://localhost:8000/api/entradaysalidagym/entradagym";
  const urlSalida = "http://localhost:8000/api/entradaysalidagym/salidagym";

  return (
    <Dashboard
      urlEntrada={urlEntrada}
      urlSalida={urlSalida}
      salidaMasiva={"http://localhost:8000/api/gym/salidamasiva"}
      btnSalidaMasiva={true}
      showConVehiculoSalida={false}
      nameTopBar="Gym"
      nameAdmin="unknown Admin"
      showColumnaIngreso={false}
      showEntrada={false}
      showPlaca={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidagym/index"
      )}
      createRegister={createRegister(urlEntrada)}
      createSalida={createSalida(urlSalida)}
    />
  );
}

// 🟢 CASA DE APOYO
export function DashboardCasaApoyo() {
  const urlEntrada =
    "http://localhost:8000/api/entradaysalidacasa/entradacasadeapoyo";
  const urlSalida =
    "http://localhost:8000/api/entradaysalidacasa/salidacasadeapoyo";

  return (
    <Dashboard
      urlEntrada={urlEntrada}
      urlSalida={urlSalida}
      salidaMasiva={"http://localhost:8000/api/casadeapoyo/salidamasiva"}
      btnSalidaMasiva={true}
      showConVehiculoSalida={false}
      nameTopBar="Casa de apoyo"
      nameAdmin="unknown Admin"
      showColumnaIngreso={false}
      showPlaca={false}
      showEntrada={false}
      getRegisters={getRegisters(
        "http://localhost:8000/api/entradaysalidacasa/index"
      )}
      createRegister={createRegister(urlEntrada)}
      createSalida={createSalida(urlSalida)}
    />
  );
}

// 🟢 GRANJA
export function DashboardGranja() {
  const urlEntrada =
    "http://localhost:8000/api/entradaysalidagranja/entradagranja";
  const urlSalida =
    "http://localhost:8000/api/entradaysalidagranja/salidagranja";

  return (
    <Dashboard
      urlEntrada={urlEntrada}
      urlSalida={urlSalida}
      salidaMasiva={"http://localhost:8000/api/granja/salidamasiva"}
      btnSalidaMasiva={true}
      showConVehiculoSalida={true}
      showPlaca={true}
      nameTopBar="Granja"
      nameAdmin="unknown Admin"
      showColumnaIngreso={true}
      showEntrada={true}
      getRegisters={getRegistersGranja}
      createRegister={createRegisterGranja(urlEntrada)}
      createSalida={createRegisterSalidaGranja}
    />
  );
}
