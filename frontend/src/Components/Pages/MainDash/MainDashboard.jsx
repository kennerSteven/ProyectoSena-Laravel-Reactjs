import KPI from "./Kpi";
import "../../../styles/KPI.css";
import KPIBarChart from "../../Charts/BarChar";
import TablaHistorial from "../../TableHistorial";

export default function MainDashboard() {
  return (
    <div className="container px-4 py-3 mt-1 mt-md-2 mt-lg-2 mt-xl-2">
      <div className="">
        {/* KPIs distribuidos responsivamente y centrados */}
        <div className="row justify-content-center gap-2">
          <div className="col-12 col-md-6 col-xl-2 mb-3 mb-xl-0">
            <KPI
              nameKpi="Usuarios"
              bigValue="582"
              labelSubNameFirst="Aprendices"
              valueFirst="255"
              labelSubNameSecond="Instructores"
              valueSecond="80"
              labelSubNameThird="Administrativos"
              valueThird="35"
              icon={<i className="bi bi-people iconStyle"></i>}
            />
          </div>

          <div className="col-12 col-md-6 col-xl-3 mb-3 mb-xl-0">
            <KPI
              nameKpi="Formaciones"
              bigValue="14"
              labelSubNameFirst="Mañana"
              valueFirst="8"
              labelSubNameSecond="Tarde"
              valueSecond="4"
              labelSubNameThird="Noche"
              valueThird="2"
              icon={<i className="bi bi-journal-text iconStyle"></i>}
            />
          </div>

          <div className="col-12 col-md-6 col-xl-3 mb-3 mb-xl-0">
            <KPI
              nameKpi="Entradas"
              bigValue="56%"
              labelSubNameFirst="Instructores"
              valueFirst="22"
              labelSubNameSecond="Aprendices"
              valueSecond="120"
              labelSubNameThird="Administrativos"
              valueThird="32"
              icon={<i className="bi bi-door-open iconStyle"></i>}
            />
          </div>

          <div className="col-12 col-md-6 col-xl-2 mb-3 mb-xl-0">
            <KPI
              nameKpi="Salidas"
              bigValue="44%"
              labelSubNameFirst="Instructores"
              valueFirst="18"
              labelSubNameSecond="Aprendices"
              valueSecond="95"
              labelSubNameThird="Administrativos"
              valueThird="28"
              icon={<i className="bi bi-box-arrow-right iconStyle"></i>}
            />
          </div>
        </div>

        {/* Gráfica institucional centrada */}
        <div className="row mt-4 justify-content-center">
          <div className="col-12 col-lg-10">
            <KPIBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
