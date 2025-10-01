import { Routes, Route } from "react-router-dom";

import DashboardCata from "../Pages/Dashboard/DashboardCata";
import Login from "../Main/Login/Login";
import FormPerfil from "../Form/FomPerfiles/FormPerfil";
import FormAprendiz from "../Form/FormAprendiz";
import {
  FormAdministrativo,
 
  FormInstructor,

} from "../Pages/Form/FormEntities";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

    
      <Route path="/Dashboard" element={<DashboardCata />}>
        <Route index element={<FormPerfil />} />{" "}
        <Route path="TipoUsuario" element={<FormPerfil />} />{" "}
        <Route path="CrearAprendiz" element={<FormAprendiz />} />
        <Route path="CrearInstructor" element={<FormInstructor />} />
        <Route path="CrearAdministrativo" element={<FormAdministrativo />} />
      </Route>
    </Routes>
  );
}
