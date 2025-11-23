import SidebarItems from "./SidebarItems";
import "../../styles/NavbarOptions.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function SideBar({ valueSidebarOptions = [] }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      setShowLogoutModal(true);
    } else if (item.link) {
      navigate(item.link);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // ✅ abre el modal
  };

  return (
    <div>
      {valueSidebarOptions.map((item, index) => {
        if (item.type === "divider") {
          return <hr key={`divider-${index}`} className="divider" />;
        }

        return (
          <div key={`item-${index}`} onClick={() => handleItemClick(item)}>
            <SidebarItems
              iconClass={item.iconClass}
              link={item.link}
              label={item.label}
            />
          </div>
        );
      })}

      <div className="buttonLogout " onClick={handleLogoutClick}>
        <i
          className="pi pi-sign-out"
          style={{ fontSize: "1.2rem", cursor: "pointer" }}
        ></i>
      </div>

      <Dialog
        header="¿Cerrar sesión?"
        visible={showLogoutModal}
        style={{ width: "450px" }}
        onHide={() => setShowLogoutModal(false)}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="buttonCancelLogout"
              onClick={() => setShowLogoutModal(false)}
            />
            <Button
              label="Confirmar"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={() => {
                setShowLogoutModal(false);
                navigate("/", { replace: true }); // ✅ redirige al login
              }}
            />
          </div>
        }
      >
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </Dialog>
    </div>
  );
}
