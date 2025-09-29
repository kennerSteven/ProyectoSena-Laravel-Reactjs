import Dashboard from "../../Layout/Dashboard";
import { ItemsConfig } from "../../Layout/Data";
export default function DashboardCata() {
  return (
    <Dashboard
      ItemsDash={ItemsConfig}
      nameTopBar="Cata"
      nameAdmin="Juan Jose Pallarez"
    />
  );
}
