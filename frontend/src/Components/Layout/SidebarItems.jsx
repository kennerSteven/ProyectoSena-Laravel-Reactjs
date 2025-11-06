import { Link } from "react-router";
import "../../styles/SidebarItems.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SidebarItems({
  iconClass,
  nameItem,
  link,
  isCollapsed,
}) {
  return (
    <Link to={link} className="sidebar-item">
      <i className={iconClass}></i>
      {!isCollapsed && <span className="item-label">{nameItem}</span>}
    </Link>
  );
}
