import { useState } from "react";
import SidebarItems from "./SidebarItems";
import "../../styles/NavbarOptions.css";

export default function SideBar({ valueSidebarOptions = [] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="hamburger-container">
        <button
          className={`hamburger-btn ${isCollapsed ? "rotated" : ""}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      {valueSidebarOptions.map((item, index) => {
        if (item.type === "divider") {
          return <hr key={`divider-${index}`} className="divider" />;
        }

        return (
          <SidebarItems
            key={`item-${index}`}
            iconClass={item.iconClass}
            nameItem={item.nameItem}
            link={item.link}
            isCollapsed={isCollapsed}
          />
        );
      })}
    </div>
  );
}
