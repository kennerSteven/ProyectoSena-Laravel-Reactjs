import { Link } from "react-router";
import "../../styles/SidebarItems.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SidebarItems({ iconClass, nameItem, link }) {
  return (
    <Link to={link} className="NavbarOptions d-flex gap-3 py-1 px-2 mb-2">
      <i className={iconClass}></i>
      {nameItem}
    </Link>
  );
}


