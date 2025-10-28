import {
  nameValueInstructor,
  // nameValueAdministrativo,
  nameValueVisitante,
  nameValueAprendiz,
  dataAprendiz,
  dataVisitante,
} from "../../Layout/Data";
import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { GetDataInstructor } from "../../Services/FetchServices";
import FormAprendiz from "../../Form/FormAprendiz";

import FormInstructor from "../../Form/FormInstructor";
import Table from "../../Layout/Tablet";
export function TableInstructor() {
  const [openModal, setModalOpen] = useState(false);

  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    async function LoadInstructor() {
      const data = await GetDataInstructor();
      console.log(data);
      setInstructor(data);
    }
    LoadInstructor();
  }, []);

  return (
    <div>
      <Table
        tableTitle="Listar Instructores"
        nameValue={nameValueInstructor}
        dataTable={instructor}
        nameButton="Crear Instructor"
        functionModal={() => setModalOpen(true)}
      />

      <Dialog
        header="Formulario Instructor"
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormInstructor closeModal={() => setModalOpen(false)} />
      </Dialog>
    </div>
  );
}

// export function TableAdministrativo() {
//   const [openModal, setModalOpen] = useState(false);

//   return (
//     <div>
//       <Table
//         tableTitle="Listar administrativos"
//         nameValue={nameValueAdministrativo}
//         dataTable={dataAdministrativo}
//         nameButton="Crear Administrativo"
//         functionModal={() => setModalOpen(true)}
//       />

//       <Dialog
//         header="Crear nuevo Administrativo"
//         visible={openModal}
//         style={{ width: "700px" }}
//         onHide={() => setModalOpen(false)}
//         modal
//       >
//         <FormAdministrativo />
//       </Dialog>
//     </div>
//   );
// }

export function TableAprendiz() {
  const [openModal, setModalOpen] = useState(false);
  return (
    <div>
      <Table
        tableTitle="Listar aprendiz"
        nameValue={nameValueAprendiz}
        dataTable={dataAprendiz}
        nameButton="Crear Aprendiz"
        functionModal={() => setModalOpen(true)}
      />
      <Dialog
        header="Crear nuevo Aprendiz"
        visible={openModal}
        style={{ width: "950px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormAprendiz />
      </Dialog>
    </div>
  );
}

export function TableVisitante() {
  return (
    <Table
      tableTitle="Listar visitantes"
      nameValue={nameValueVisitante}
      dataTable={dataVisitante}
      nameButton="Crear Visitante"
    />
  );
}
