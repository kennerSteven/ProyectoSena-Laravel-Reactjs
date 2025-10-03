import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import logo from "../../assets/img/logoSena.png";
import { Outlet } from "react-router-dom";
import "../../styles/SidebarItems.css";

export default function Dashboard({ ItemsDash, nameTopBar, nameAdmin }) {
  return (
    <div>
      <div className="d-flex">
        <div className="d-flex flex-column px-4    sidebar">
          <div className="d-flex align-items-center justify-content-center ">
            <img src={logo} className="mt-3 pb-3" width="90px" height="110px" alt="Logo Sena" />
          </div>
          <hr />
          <div className="d-flex flex-column ">
            <SideBar valueSidebarOptions={ItemsDash} />
          </div>
        </div>

        <div className="w-100 d-flex flex-column">
          <TopBar nameTopBar={nameTopBar} nameAdmin={nameAdmin} />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
