import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import FormAprendiz from "../../Form/FormAprendiz";
import { nameValueInstructor } from "../../Layout/Data";
import { GetDataInstructor } from "../../Services/FetchServices";
import {
  GetDataAprendiz,
  GetDataAdministrativo,
} from "../../Services/FetchServices";
import FormInstructor from "../../Form/FormInstructor";
import FormAdministrativo from "../../Form/FormAdministrativo";
import Table from "../../Layout/Tablet";
import FormPerfil from "../../Form/FomPerfiles/FormPerfil";
import { nameValueAdministrativo } from "../../Layout/Data";
export function TableInstructor() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  async function LoadInstructor() {
    const data = await GetDataInstructor();

    const instructoresFiltrados = data.filter((item) =>
      item.perfile?.nombre?.toLowerCase().includes("instructor")
    );

    const flattened = instructoresFiltrados.map((item) => ({
      ...item,
      tipoPerfil: item.perfile?.nombre || "Sin perfil",
    }));

    setInstructor(flattened);
  }

  useEffect(() => {
    LoadInstructor();
  }, []);

  const handleEditInstructor = (item) => {
    setSelectedInstructor(item);
    setModalOpen(true);
  };

  return (
    <div>
      <Table
        tableTitle="Listar Instructores"
        nameValue={nameValueInstructor}
        dataTable={instructor}
        nameButton="Crear Instructor"
        functionModal={() => {
          setSelectedInstructor(null);
          setModalOpen(true);
        }}
        openCreatePerfil={() => setModalCreatePerfil(true)}
        reloadTable={LoadInstructor}
        onEdit={handleEditInstructor}
      />
      <Dialog
        header={selectedInstructor ? "Editar Instructor" : "Nuevo Instructor"}
        visible={openModal}
        style={{ width: "750px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormInstructor
          closeModal={() => setModalOpen(false)}
          initialData={selectedInstructor}
        />
      </Dialog>

      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
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
  const [aprendices, setAprendices] = useState([]);

  useEffect(() => {
    async function LoadAprendices() {
      const data = await GetDataAprendiz();

      const aprendicesFiltrados = data.filter((item) =>
        item.perfile?.nombre?.toLowerCase().includes("aprendiz")
      );

      const flattened = aprendicesFiltrados.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));

      setAprendices(flattened);
    }

    LoadAprendices();
  }, []);

  return (
    <div>
      <Table
        tableTitle="Listar Aprendices"
        nameValue={nameValueInstructor}
        dataTable={aprendices}
        functionModal={() => setModalOpen(true)}
        openCreatePerfil={() => setModalCreatePerfil(true)}
      />

      <Dialog
        header="Nuevo Aprendiz"
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormAprendiz closeModal={() => setModalOpen(false)} />
      </Dialog>

      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
        modal
      >
        <FormPerfil closeModal={() => setModalCreatePerfil(false)} />
      </Dialog>
    </div>
  );
}
export function TableAdministrativo() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [administrativos, setAdministrativos] = useState([]);

  useEffect(() => {
    async function LoadAdministrativos() {
      const data = await GetDataAdministrativo();

      const administrativosFiltrados = data.filter((item) =>
        item.perfile?.nombre?.toLowerCase().includes("administrativo")
      );

      const flattened = administrativosFiltrados.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));

      setAdministrativos(flattened);
    }

    LoadAdministrativos();
  }, []);

  return (
    <div>
      <Table
        tableTitle="Listar Administrativos"
        nameValue={nameValueAdministrativo}
        dataTable={administrativos}
        functionModal={() => setModalOpen(true)}
        openCreatePerfil={() => setModalCreatePerfil(true)}
      />

      <Dialog
        header="Nuevo Administrativo"
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormAdministrativo closeModal={() => setModalOpen(false)} />
      </Dialog>

      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
        modal
      >
        <FormPerfil closeModal={() => setModalCreatePerfil(false)} />
      </Dialog>
    </div>
  );
}
