import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/inter/400.css";

import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

import App from "./Components/Routes/Routes";
import FormRegister from "./Components/Form/FormVehicles/FormRegister";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
