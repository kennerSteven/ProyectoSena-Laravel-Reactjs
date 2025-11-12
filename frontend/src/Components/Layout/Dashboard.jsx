import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import logo from "../../assets/img/logoSena.png";
import { Outlet } from "react-router-dom";
import "../../styles/SidebarItems.css";

export default function Dashboard({ ItemsDash, nameTopBar, nameAdmin }) {
  return (
    <div>
      <div className="d-flex  ">
        <div className="d-flex flex-column px-3 shadow  sidebar">
          <div className="d-flex align-items-center justify-content-center mt-3 ">
            <img
              src={logo}
              className="pt-2 pb-3"
              width="70px"
              alt="Logo Sena"
            />
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center  ">
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
