import Table from "../../Layout/Table";
import {
  nameValueInstructor,
  nameValueAdministrativo,
  nameValueVisitante,
  nameValueAprendiz,
  dataAdministrativo,
  dataAprendiz,
  dataInstructor,
  dataVisitante,
} from "../../Layout/Data";
export function TableInstructor() {
  return (
    <Table
      tableTitle="Listar Instructores"
      nameValue={nameValueInstructor}
      dataTable={dataInstructor}
    />
  );
}

export function TableAdministrativo() {
  return (
    <Table
      tableTitle="Listar administrativos"
      nameValue={nameValueAdministrativo}
      dataTable={dataAdministrativo}
    />
  );
}
export function TableAprendiz() {
  return (
    <Table
      tableTitle="Listar aprendiz"
      nameValue={nameValueAprendiz}
      dataTable={dataAprendiz}
    />
  );
}
export function TableVisitante() {
  return (
    <Table
      tableTitle="Listar visitantes"
      nameValue={nameValueVisitante}
      dataTable={dataVisitante}
    />
  );
}
