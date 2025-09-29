import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/inter/400.css";

import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import DashboardCata from "./Components/Pages/Dashboard/DashboardCata";
import App from "./Components/Routes/Routes";
import Login from "./Components/Main/Login/Login";
import UsuarioService from "./Components/Services/UserServices";
import FormPerfil from "./Components/Form/FomPerfiles/FormPerfil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormPerfil />
  </StrictMode>
);
