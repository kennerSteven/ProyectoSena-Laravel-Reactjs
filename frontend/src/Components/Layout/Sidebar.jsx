import SidebarItems from "./SidebarItems";
import "../../styles/NavbarOptions.css";

import { useNavigate } from "react-router-dom";

export default function SideBar({ valueSidebarOptions = [] }) {
  // const [showLogoutModal, setShowLogoutModal] = useState(false); // Eliminado
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    // La lógica de 'item.action === "logout"' es eliminada ya que el item no existe.
    if (item.link) {
      navigate(item.link);
    }
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
    </div>
  );
}
