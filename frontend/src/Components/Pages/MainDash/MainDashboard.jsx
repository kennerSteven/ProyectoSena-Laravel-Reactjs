import KPI from "./Kpi";
import "../../../styles/KPI.css";
import KPIBarChart from "../../Charts/BarChar";

export default function MainDashboard() {
  return (
    <div className="containerMain  mx-auto  ">
      <div className="containerMainDash   ">
        <div className="d-flex justify-content-center gap-5 flex-wrap py-3 ">
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
        <KPIBarChart />
      </div>
    </div>
  );
}
