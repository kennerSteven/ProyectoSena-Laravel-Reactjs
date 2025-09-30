import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/inter/400.css";

import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

import App from "./Components/Routes/Routes";
import FormPerfil from "./Components/Form/FomPerfiles/FormPerfil";
import { FormAdministrativo } from "./Components/Pages/Form/FormEntities";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
