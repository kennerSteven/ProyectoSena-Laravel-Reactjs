import "../../styles/NormalButton.css";
import { IoIosAdd } from "react-icons/io";
export default function NormalButton({ NameButton,onClick }) {
  return (
    <div>
      <button className="normalButton" onClick={onClick} >
        <IoIosAdd  className="iconAdd"/>
        {NameButton}
      </button>
    </div>
  );
}
