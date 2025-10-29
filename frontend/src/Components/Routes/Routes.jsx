import { Routes, Route } from "react-router-dom";

import DashboardCata from "../Pages/Dashboard/DashboardCata";
import Login from "../Main/Login/Login";
import FormPerfil from "../Form/FomPerfiles/FormPerfil";
import FormFormacion from "../Form/FormFormacion/FormFormacion";
import FormInstructor from "../Form/FormInstructor";


import {
  TableInstructor,

  TableAprendiz
} from "../Pages/Table/TableInstructor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/Dashboard" element={<DashboardCata />}>
        <Route path="/Dashboard/CrearPerfil" element={<FormPerfil />} />
        <Route path="/Dashboard/crearFormacion" element={<FormFormacion />} />
        <Route path="TipoUsuario" element={<FormPerfil />} />
        {/* <Route path="CrearAprendiz" element={<FormAprendiz />} /> */}
        <Route path="CrearInstructor" element={<FormInstructor />} />
        {/* <Route path="CrearAdministrativo" element={<FormAdministrativo />} /> */}
        {/* Ruta tablas */}
        <Route path="ListarInstructor" element={<TableInstructor />} />
        <Route path="ListarAprendiz" element={<TableAprendiz />} />
        {/* <Route path="ListarAdministrativo" element={<TableAdministrativo />} /> */}
        {/* <Route path="ListarVisitante" element={<TableVisitante />} /> */}
      </Route>
    </Routes>
  );
}