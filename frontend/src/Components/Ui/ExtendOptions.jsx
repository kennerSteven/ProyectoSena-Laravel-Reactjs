import { useState } from "react";
import "../../styles/CollapseOptions.css";
import "../../styles/SidebarItems.css";
import { Link } from "react-router-dom";

export default function ExtendOptions({ nameItem, iconClass, subItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="py-1 px-2 rounded pepe "
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary className=" d-flex justify-content-between gato pt-2 mb-3 ">
        <span className="d-flex align-items-center containerIcon">
          <i className={`${iconClass} me-2`}></i>
          {nameItem}
        </span>
        <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
      </summary>

      <ul className="list-unstyled d-flex flex-column  bg-light rounded shadow-sm mt-2 px-4  ">
        {subItems.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="text-decoration-none py-5 py-lg-2 subItems "
          >
            <span className="CollapseOptions d-flex align-items-center gap-2 containerIcon">
              <i className={`${item.icon} itemIconCollapse `}></i>
              {item.label}
            </span>
          </Link>
        ))}
      </ul>
    </details>
  );
}
