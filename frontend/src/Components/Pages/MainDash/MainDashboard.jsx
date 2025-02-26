// KpiCards.jsx

import { useEffect, useState } from "react";
import KPI from "./Kpi";
import "../../../styles/KPI.css";
// Asegúrate de que esta ruta sea correcta para tu KPIDashboard
import KPIDashboard from "../../Charts/BarChar";

// Recibe urlDoughnut y urlBarchar como props
export default function KpiCards({
  urlEntrada,
  urlSalida,
  urlBarchar,
  urlDoughnut,
}) {
  const [usuarios, setUsuarios] = useState({
    total: 0,
    aprendices: 0,
    instructores: 0,
    administrativos: 0,
  });

  const [fichas, setFichas] = useState({
    total: 0,
    manana: 0,
    tarde: 0,
    noche: 0,
  });

  const [entrada, setEntrada] = useState({
    total: 0,
    aprendices: 0,
    instructores: 0,
    administrativos: 0,
  });

  const [salida, setSalida] = useState({
    total: 0,
    aprendices: 0,
    instructores: 0,
    administrativos: 0,
  });

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        // --- Usuarios ---
        const resUsuarios = await fetch(
          "http://localhost:8000/api/usuarios/estadisticakpi"
        );
        const dataUsuarios = await resUsuarios.json();

        let aprendices = 0;
        let instructores = 0;
        let administrativos = 0;

        (dataUsuarios.porperfil || []).forEach((p) => {
          const perfil = p.perfil?.toLowerCase() || "";
          if (perfil.includes("aprendiz")) aprendices += p.cantidad;
          else if (perfil.includes("instructor")) instructores += p.cantidad;
          else if (perfil.includes("administrativo"))
            administrativos += p.cantidad;
        });

        setUsuarios({
          total: dataUsuarios.totalusuarios || 0,
          aprendices,
          instructores,
          administrativos,
        });

        // --- Fichas ---
        const resFichas = await fetch(
          "http://localhost:8000/api/ficha/estadisticakpi"
        );
        const dataFichas = await resFichas.json();
        const jornada = dataFichas.porjornada || {};

        setFichas({
          total: dataFichas.totalfichas || 0,
          manana: jornada["Mañana"] || jornada["mañana"] || 0,
          tarde: jornada["Tarde"] || jornada["tarde"] || 0,
          noche: jornada["Noche"] || jornada["noche"] || 0,
        });

        // --- Entradas (Usando urlEntrada) ---
        if (urlEntrada) {
          const resEntrada = await fetch(urlEntrada);
          const dataEntrada = await resEntrada.json();

          const entradaContador = {
            total: 0,
            aprendices: 0,
            instructores: 0,
            administrativos: 0,
          };

          (dataEntrada || []).forEach((item) => {
            const perfil = item.usuarios?.perfile?.nombre?.toLowerCase() || "";
            const esAprendiz = perfil.includes("aprendiz");
            const esInstructor = perfil.includes("instructor");
            const esAdministrativo = perfil.includes("administrativo");

            if (item.tipo === "entrada" || item.tipo === "Entrada") {
              entradaContador.total += 1;
              if (esAprendiz) entradaContador.aprendices += 1;
              else if (esInstructor) entradaContador.instructores += 1;
              else if (esAdministrativo) entradaContador.administrativos += 1;
            }
          });
          setEntrada(entradaContador);
        }

        // --- Salida (Usando urlSalida) ---
        if (urlSalida) {
          const resSalida = await fetch(urlSalida);
          const dataSalida = await resSalida.json();

          const salidaContador = {
            total: 0,
            aprendices: 0,
            instructores: 0,
            administrativos: 0,
          };

          (dataSalida || []).forEach((item) => {
            const perfil = item.usuarios?.perfile?.nombre?.toLowerCase() || "";
            const esAprendiz = perfil.includes("aprendiz");
            const esInstructor = perfil.includes("instructor");
            const esAdministrativo = perfil.includes("administrativo");

            if (item.tipo === "salida" || item.tipo === "Salida") {
              salidaContador.total += 1;
              if (esAprendiz) salidaContador.aprendices += 1;
              else if (esInstructor) salidaContador.instructores += 1;
              else if (esAdministrativo) salidaContador.administrativos += 1;
            }
          });
          setSalida(salidaContador);
        }
      } catch (error) {
        console.error("Error al cargar KPIs:", error);
      }
    };

    fetchKPIs();
  }, [urlEntrada, urlSalida]);

  return (
    <div className="container px-4 py-2 mt-1 mt-md-2 mt-lg-4 mt-xl-5">
      <div>
        <div className="row justify-content-center gap-2">
          <div
            className="col-12 col-md-6 mb-3 mb-xl-0"
            style={{ width: "350px" }}
          >
            <KPI
              nameKpi="Usuarios"
              bigValue={usuarios.total}
              labelSubNameFirst="Aprendices"
              valueFirst={usuarios.aprendices}
              labelSubNameSecond="Instructores"
              valueSecond={usuarios.instructores}
              labelSubNameThird="Administrativos"
              valueThird={usuarios.administrativos}
              icon={<i className="bi bi-people iconStyle"></i>}
            />
          </div>

          <div
            className="col-12 col-md-6 mb-3 mb-xl-0"
            style={{ width: "220px" }}
          >
            <KPI
              nameKpi="Formaciones"
              bigValue={fichas.total}
              labelSubNameFirst="Mañana"
              valueFirst={fichas.manana}
              labelSubNameSecond="Tarde"
              valueSecond={fichas.tarde}
              labelSubNameThird="Noche"
              valueThird={fichas.noche}
              icon={<i className="bi bi-journal-text iconStyle"></i>}
            />
          </div>

          <div
            className="col-12 col-md-6 mb-2 mb-xl-0"
            style={{ width: "250px" }}
          >
            <KPI
              nameKpi="Entrada"
              bigValue={entrada.total}
              labelSubNameFirst="Instructores"
              valueFirst={entrada.instructores}
              labelSubNameSecond="Aprendices"
              valueSecond={entrada.aprendices}
              labelSubNameThird="Administrativos"
              valueThird={entrada.administrativos}
              icon={<i className="bi bi-box-arrow-in-left iconStyle"></i>}
            />
          </div>

          <div
            className="col-12 col-md- mb-2 mb-xl-0"
            style={{ width: "250px" }}
          >
            <KPI
              nameKpi="Salida"
              bigValue={salida.total}
              labelSubNameFirst="Instructores"
              valueFirst={salida.instructores}
              labelSubNameSecond="Aprendices"
              valueSecond={salida.aprendices}
              labelSubNameThird="Administrativos"
              valueThird={salida.administrativos}
              icon={<i className="bi bi-box-arrow-right iconStyle"></i>}
            />
          </div>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Propagación de ambas URLs a KPIDashboard */}
            <KPIDashboard urlBar={urlBarchar} urlDoughnut={urlDoughnut} />
          </div>
        </div>
      </div>
    </div>
  );
}
