import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TablaHistorial from "./Components/TableHistorial";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/inter/400.css";
import BasicFilterDemo from "./prueba";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import FormFicha from "./Components/Form/FormFicha";
import App from "./Components/Routes/Routes";
import TablaFicha from "./Components/TableFicha";
import ActivarInstructor from "./Components/Form/TableActivarInstructor";
import SelectLogin from "./Components/Main/SelectLogin/SelectLogin";
import { PerfilesView } from "./Components/Pages/Table/Perfil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
