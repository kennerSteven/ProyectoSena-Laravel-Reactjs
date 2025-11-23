import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import logo from "../../assets/img/logoSena.png";
import { Outlet, useLocation } from "react-router-dom";
import "../../styles/SidebarItems.css";
import { getItemsConfig } from "./Data";

export default function Dashboard({
  nameTopBar,
  nameAdmin,
  showEntrada,
  getRegisters,
  createRegister,
  createSalida,
  showColumnaIngreso,
  showConVehiculoSalida,
  showPlaca,
  salidaMasiva,
  btnSalidaMasiva,
}) {
  const location = useLocation();

  const dashboardPrefix = location.pathname.split("/")[1]
    ? `/${location.pathname.split("/")[1]}`
    : "/dashboardcata";

  const items = getItemsConfig(dashboardPrefix.toLowerCase());

  return (
    <div className="dashboard-layout">
      <div className="d-flex">
        <aside className="d-flex flex-column shadow sidebar">
          <div className="d-flex align-items-center justify-content-center mt-2 px-3">
            <img src={logo} className="py-2" width="55px" alt="Logo Sena" />
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <SideBar valueSidebarOptions={items} />
          </div>
        </aside>

        <main className="w-100 d-flex flex-column">
          <TopBar
            nameTopBar={nameTopBar}
            nameAdmin={nameAdmin}
            showEntrada={showEntrada}
            getRegisters={getRegisters}
            createRegister={createRegister}
            createSalida={createSalida}
            showColumnaIngreso={showColumnaIngreso}
            showConVehiculoSalida={showConVehiculoSalida}
            showPlaca={showPlaca}
            salidaMasiva={salidaMasiva}
            btnSalidaMasiva={btnSalidaMasiva}
          />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
