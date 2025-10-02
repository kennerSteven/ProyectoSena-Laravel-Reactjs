import SidebarItems from "./SidebarItems";
import "../../styles/NavbarOptions.css";

import ExtendOptions from "../Ui/ExtendOptions";

export default function SideBar({ valueSidebarOptions = [] }) {
  return (
    <div>
      {valueSidebarOptions.map((item, index) => {
        if (item.type === "divider") return <hr className="divider" />;

        if (item.subItems) {
          return (
            <ExtendOptions
              key={index}
              nameItem={item.nameItem}
              iconClass={item.iconClass}
              subItems={item.subItems}
              link={item.link}
            />
          );
        } else {
          return (
            <SidebarItems
              key={index}
              iconClass={item.iconClass}
              nameItem={item.nameItem}
              link={item.link}
            />
          );
        }
      })}
    </div>
  );
}
