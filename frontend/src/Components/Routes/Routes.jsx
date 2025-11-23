import { Routes, Route } from "react-router-dom";
import SelectLogin from "../Main/SelectLogin/SelectLogin";
import {
  LoginCata,
  LoginCasaApoyo,
  LoginGranja,
  LoginGym,
} from "../Main/Login/EntitiesLogin";

import {
  DashboardCasaApoyo,
  DashboardCata,
  DashboardGranja,
  DashboardGym,
} from "../Pages/Dashboard/DashboardMain";

import TablaFicha from "../TableFicha";
import FormPerfil from "../Form/FomPerfiles/FormPerfil";
import FormFormacion from "../Form/FormFormacion/FormFormacion";
import {
  TableInstructor,
  TableAprendizs,
  TableAdministrativo,
} from "../Pages/Table/TableInstructor";
import {
  KpiGRANJA,
  KpiCASA,
  KpiCATA,
  KpiGym,
} from "../Pages/MainDash/KpiEntities";
import TablaVisitantes from "../TableVisitantes";

export default function App() {
  return (
    <Routes>
      {/* Login routes */}

      <Route path="/" element={<SelectLogin />} />
      <Route path="/logincata" element={<LoginCata />} />
      <Route path="/logingranja" element={<LoginGranja />} />
      <Route path="/logincasaapoyo" element={<LoginCasaApoyo />} />
      <Route path="/logingym" element={<LoginGym />} />

      {/* Dashboard Cata */}
      <Route path="/dashboardcata" element={<DashboardCata />}>
        <Route index element={<KpiCATA />} />
        <Route path="inicio" element={<KpiCATA />} />
        <Route path="formaciones" element={<TablaFicha />} />
        <Route path="crearperfil" element={<FormPerfil />} />
        <Route path="crearformacion" element={<FormFormacion />} />
        <Route path="tipousuario" element={<FormPerfil />} />
        <Route path="listarinstructor" element={<TableInstructor />} />
        <Route path="listaradministrativo" element={<TableAdministrativo />} />
        <Route path="listaraprendiz" element={<TableAprendizs />} />
        <Route path="listarvisitante" element={<TablaVisitantes />} />
      </Route>

      {/* Dashboard Gym */}
      <Route path="/dashboardgym" element={<DashboardGym />}>
        <Route index element={<KpiGym />} />
        <Route path="inicio" element={<KpiGym />} />
        <Route path="formaciones" element={<TablaFicha />} />
        <Route path="crearperfil" element={<FormPerfil />} />
        <Route path="crearformacion" element={<FormFormacion />} />
        <Route path="tipousuario" element={<FormPerfil />} />
        <Route path="listarinstructor" element={<TableInstructor />} />
        <Route path="listaradministrativo" element={<TableAdministrativo />} />
        <Route path="listaraprendiz" element={<TableAprendizs />} />
        <Route path="listarvisitante" element={<TablaVisitantes />} />
      </Route>

      {/* Dashboard Casa de Apoyo */}
      <Route path="/dashboardcasa" element={<DashboardCasaApoyo />}>
        <Route index element={<KpiCASA />} />
        <Route path="inicio" element={<KpiCASA />} />
        <Route path="formaciones" element={<TablaFicha />} />
        <Route path="crearperfil" element={<FormPerfil />} />
        <Route path="crearformacion" element={<FormFormacion />} />
        <Route path="tipousuario" element={<FormPerfil />} />
        <Route path="listarinstructor" element={<TableInstructor />} />
        <Route path="listaradministrativo" element={<TableAdministrativo />} />
        <Route path="listaraprendiz" element={<TableAprendizs />} />
        <Route path="listarvisitante" element={<TablaVisitantes />} />
      </Route>

      {/* Dashboard Granja */}
      <Route path="/dashboardgranja" element={<DashboardGranja />}>
        <Route index element={<KpiGRANJA />} />
        <Route path="inicio" element={<KpiGRANJA />} />
        <Route path="formaciones" element={<TablaFicha />} />
        <Route path="crearperfil" element={<FormPerfil />} />
        <Route path="crearformacion" element={<FormFormacion />} />
        <Route path="tipousuario" element={<FormPerfil />} />
        <Route path="listarinstructor" element={<TableInstructor />} />
        <Route path="listaradministrativo" element={<TableAdministrativo />} />
        <Route path="listaraprendiz" element={<TableAprendizs />} />
        <Route path="listarvisitante" element={<TablaVisitantes />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<p>Ruta no encontrada</p>} />
    </Routes>
  );
}
