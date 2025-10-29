import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import FormAprendiz from "../../Form/FormAprendiz";
import { nameValueInstructor } from "../../Layout/Data";
import { GetDataInstructor } from "../../Services/FetchServices";
import { GetDataAprendiz } from "../../Services/FetchServices";
import FormInstructor from "../../Form/FormInstructor";
import Table from "../../Layout/Tablet";
import FormPerfil from "../../Form/FomPerfiles/FormPerfil";
export function TableInstructor() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    async function LoadInstructor() {
      const data = await GetDataInstructor();

      const flattened = data.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));

      setInstructor(flattened);
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
        openCreatePerfil={() => setModalCreatePerfil(true)}
      />
      <Dialog
        header="Nuevo Instructor"
      
        visible={openModal}
        style={{ width: "750px" }}
        onHide={() => setModalOpen(false)} // ← este cierra el correcto
        modal
      >
        <FormInstructor closeModal={() => setModalOpen(false)} />
      </Dialog>

      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil} // ← aquí estaba el error
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)} // ← también estaba mal
        modal
      >
        <FormPerfil closeModal={() => setModalCreatePerfil(false)} />
      </Dialog>
    </div>
  );
}

export function TableAprendiz() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [aprendiz, setAprendiz] = useState([]);

  useEffect(() => {
    async function LoadAprendiz() {
      const data = await GetDataAprendiz();

      const flattened = data.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));

      setAprendiz(flattened);
    }

    LoadAprendiz();
  }, []);

  return (
    <div>
      <Table
        tableTitle="Listar Aprendices"
        nameValue={nameValueInstructor}
        dataTable={aprendiz}

        functionModal={() => setModalOpen(true)}
        openCreatePerfil={() => setModalCreatePerfil(true)}
      />
      <Dialog
        header="Nuevo Aprendiz"
      
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => setModalOpen(false)} // ← este cierra el correcto
        modal
      >
        <FormAprendiz  />
      </Dialog>

      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil} // ← aquí estaba el error
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)} // ← también estaba mal
        modal
      >
        <FormPerfil closeModal={() => setModalCreatePerfil(false)} />
      </Dialog>
    </div>
  );
}
