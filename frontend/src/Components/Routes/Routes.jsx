import { Routes, Route } from "react-router-dom";
import { TableAprendizs } from "../Pages/Table/TableInstructor";
import DashboardCata from "../Pages/Dashboard/DashboardCata";
import Login from "../Main/Login/Login";
import FormPerfil from "../Form/FomPerfiles/FormPerfil";
import FormFormacion from "../Form/FormFormacion/FormFormacion";
import { TableAdministrativo } from "../Pages/Table/TableInstructor";
import MainDashboard from "../Pages/MainDash/MainDashboard";
import TablaFicha from "../TableFicha";
import { TableInstructor } from "../Pages/Table/TableInstructor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/Dashboard" element={<DashboardCata />}>
        <Route index element={<MainDashboard />} />
        <Route path="inicio" element={<MainDashboard />} />
        <Route path="Formaciones" element={<TablaFicha />} />
        <Route path="CrearPerfil" element={<FormPerfil />} />
        <Route path="crearFormacion" element={<FormFormacion />} />
        <Route path="TipoUsuario" element={<FormPerfil />} />
        <Route path="ListarInstructor" element={<TableInstructor />} />
        <Route path="ListarAdministrativo" element={<TableAdministrativo />} />
        <Route path="ListarAprendiz" element={<TableAprendizs />} />
      </Route>
    </Routes>
  );
}
