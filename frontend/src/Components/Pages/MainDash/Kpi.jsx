import "../../../styles/KPI.css";

export default function KPI({
  nameKpi,
  bigValue,
  labelSubNameFirst,
  valueFirst,
  labelSubNameSecond,
  valueSecond,
  labelSubNameThird,
  valueThird,
  icon,
}) {
  return (
    <div className="kpiContainer shadow px-4 pt-2">
      <small>{nameKpi}</small>

      <div className="d-flex justify-content-between   align-items-center">
        <h3 className="fw-bold bigValue py-2">{bigValue}</h3>
        <div>{icon}</div>
      </div>

      <div className="d-flex flex-column gap-1 mt-2">
        <div className="d-flex justify-content-between">
          <span className="labelKpi">{labelSubNameFirst}</span>
          <strong>{valueFirst}</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span className="labelKpi">{labelSubNameSecond}</span>
          <strong>{valueSecond}</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span className="labelKpi">{labelSubNameThird}</span>
          <strong>{valueThird}</strong>
        </div>
      </div>
    </div>
  );
}
