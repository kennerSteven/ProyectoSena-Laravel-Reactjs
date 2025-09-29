import { Routes, Route } from "react-router-dom";
import FormAdministrativo from "../Pages/Form/FormAdministrativo";
import FormAprendiz from "../Pages/Form/FormAprendiz";
import FormInstructor from "../Pages/Form/FormInstructor";
import DashboardCata from "../Pages/Dashboard/DashboardCata";
import Login from "../Main/Login/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<DashboardCata />}>
        <Route path="/Dashboard/CrearAprendiz" element={<FormAprendiz />} />
        <Route path="/Dashboard/CrearInstructor" element={<FormInstructor />} />
        <Route
          path="/Dashboard/CrearAdministrativo"
          element={<FormAdministrativo />}
        />
      </Route>
    </Routes>
  );
}
