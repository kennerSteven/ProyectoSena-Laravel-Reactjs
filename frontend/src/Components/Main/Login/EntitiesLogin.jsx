import Login from "./Login";
import granjaJPG from "../../../assets/img/SENAGRANJA.jpg";
export function LoginGranja() {
  return <Login entitiePlace="Granja" imgEntitiePlace={granjaJPG} />;
}

export function LoginCasaApoyo() {
  return <Login entitiePlace="Casa de apoyo" imgEntitiePlace={granjaJPG} />;
}
export function LoginCata() {
  return <Login entitiePlace="CATA" imgEntitiePlace={granjaJPG} />;
}
export function LoginGym() {
  return <Login entitiePlace="Gym" imgEntitiePlace={granjaJPG} />;
}
