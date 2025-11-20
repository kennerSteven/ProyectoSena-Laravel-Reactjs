import Login from "./Login";
import granjaJPG from "../../../assets/img/SENAGRANJA.jpg";
import Casa from "../../../assets/img/casaApoyo.jpg";
import Cata from "../../../assets/img/CATA.jpg";
export function LoginGranja() {
  return <Login entitiePlace="Granja" imgEntitiePlace={granjaJPG} />;
}

export function LoginCasaApoyo() {
  return <Login entitiePlace="Casa de apoyo" imgEntitiePlace={Casa} />;
}
export function LoginCata() {
  return <Login entitiePlace="CATA" imgEntitiePlace={Cata} />;
}
export function LoginGym() {
  return <Login entitiePlace="Gym" imgEntitiePlace={granjaJPG} />;
}
