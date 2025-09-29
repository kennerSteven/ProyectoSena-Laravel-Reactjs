import "../../styles/Cards.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function cards({ valueCard, cardName, iconClass }) {
  return (
    <div className="d-flex justify-content-center gap-4 py-5">
      <div className="CardEarnings d-flex justify-content-between  align-items-center">
        <div>
          <h6 className="title">{cardName}</h6>
          <p className="number">{valueCard}</p>
        </div>
        <i className={`${iconClass},iconEarnings`}></i>
      </div>
    </div>
  );
}
