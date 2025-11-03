import { Routes, Route } from "react-router-dom";

import DashboardCata from "../Pages/Dashboard/DashboardCata";
import Login from "../Main/Login/Login";
import FormPerfil from "../Form/FomPerfiles/FormPerfil";
import FormFormacion from "../Form/FormFormacion/FormFormacion";
import FormInstructor from "../Form/FormInstructor";

import MainDashboard from "../Pages/MainDash/MainDashboard";
import { TableInstructor, TableAprendiz } from "../Pages/Table/TableInstructor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/Dashboard" element={<DashboardCata />}>
        <Route index element={<MainDashboard />} /> // ← Esta es la clave
        <Route path="inicio" element={<MainDashboard />} />
        <Route path="CrearPerfil" element={<FormPerfil />} />
        <Route path="crearFormacion" element={<FormFormacion />} />
        <Route path="TipoUsuario" element={<FormPerfil />} />
        <Route path="CrearInstructor" element={<FormInstructor />} />
        <Route path="ListarInstructor" element={<TableInstructor />} />
        <Route path="ListarAprendiz" element={<TableAprendiz />} />
      </Route>
    </Routes>
  );
}
