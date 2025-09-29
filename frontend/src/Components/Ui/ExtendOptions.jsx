import { useState } from "react";
import "../../styles/CollapseOptions.css";
import "../../styles/SidebarItems.css";
import { Link } from "react-router-dom";

export default function ExtendOptions({ nameItem, iconClass, subItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className=" text-dark p-3 rounded mb-3"
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary className=" d-flex justify-content-between pepe ">
        <span className="d-flex align-items-center">
          <i className={`${iconClass} me-2`}></i>
          {nameItem}
        </span>
        <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
      </summary>

      <ul className="list-unstyled d-flex flex-column  bg-light rounded shadow-sm mt-3">
        {subItems.map((item, idx) => (
          <Link to={item.link} key={idx} className="text-decoration-none">
            <span className="CollapseOptions d-flex align-items-center gap-2">
              <i className={`${item.icon} `}></i>
              {item.label}
            </span>
          </Link>
        ))}
      </ul>
    </details>
  );
}
