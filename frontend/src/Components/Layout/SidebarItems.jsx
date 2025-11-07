import { Link } from "react-router-dom"; // ✅ corregido: react-router-dom
import "../../styles/SidebarItems.css";
import "primeicons/primeicons.css"; // ✅ PrimeIcons

export default function SidebarItems({ iconClass, nameItem, link }) {
  return (
    <Link to={link} className="NavbarOptions d-flex gap-3 py-1 px-2 mb-2">
      <i className={`pi ${iconClass} iconClass`}></i>
      <span className="item-label">{nameItem}</span>
    </Link>
  );
}
