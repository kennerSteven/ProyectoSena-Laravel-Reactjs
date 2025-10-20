import SidebarItems from "./SidebarItems";
import "../../styles/NavbarOptions.css";

export default function SideBar({ valueSidebarOptions = [] }) {
  return (
    <div>
      {valueSidebarOptions.map((item, index) => {
        if (item.type === "divider") {
          return (
            <hr key={`divider-${index}`} className="divider mx-auto mt-3" />
          );
        }

        return (
          <SidebarItems
            key={`item-${index}`}
            iconClass={item.iconClass}
            nameItem={item.nameItem}
            link={item.link}
          />
        );
      })}
    </div>
  );
}
