import { Link } from "react-router";
import "../../styles/SidebarItems.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SidebarItems({ iconClass, nameItem, link }) {
  return (
    <Link to={link} className="NavbarOptions d-flex gap-3">
      <i className={iconClass}></i>
      {nameItem}
    </Link>
  );
}


