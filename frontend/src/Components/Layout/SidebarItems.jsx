import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-green/theme.css"; 
import "primereact/resources/primereact.min.css";
import "../../styles/SidebarItems.css";

export default function SidebarItems({ iconClass, link, label }) {
  const tooltipId = `tooltip-${iconClass.replace(/\s+/g, "-")}`;

  return (
    <>
      <Tooltip target={`#${tooltipId}`} content={label} position="right" />
      <Link to={link} className="NavbarOptions d-flex gap-3">
        <i id={tooltipId} className={`pi ${iconClass} iconClass`} />
      </Link>
    </>
  );
}
