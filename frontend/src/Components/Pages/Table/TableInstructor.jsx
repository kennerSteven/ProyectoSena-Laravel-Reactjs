import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import FormAprendiz from "../../Form/FormAprendiz";
import FormInstructor from "../../Form/FormInstructor";
import FormAdministrativo from "../../Form/FormAdministrativo";
import FormPerfil from "../../Form/FomPerfiles/FormPerfil";
import Table from "../../Layout/Tablet";
import TableAprendiz from "../../Layout/TableAprendiz";
import { activarInstructoresPorLote } from "../../Services/FetchServices";
import {
  GetDataInstructor,
  GetDataAprendiz,
  GetDataAdministrativo,
  getAdministrativosContratoDesactivados,
  getInstructoresContratoDesactivados,
} from "../../Services/FetchServices";

import {
  nameValueInstructor,
  nameValueAprendiz,
  nameValueAdministrativo,
} from "../../Layout/Data";

// --- COMPONENTE: TableInstructor ---
export function TableInstructor() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  async function LoadInstructor() {
    try {
      const data = await GetDataInstructor();
      const instructoresFiltrados = data.filter((item) =>
        item.perfile?.nombre?.toLowerCase().includes("instructor")
      );
      const flattened = instructoresFiltrados.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));
      setInstructor(flattened);
    } catch (error) {
      console.error("Error al cargar instructores:", error);
    }
  }

  useEffect(() => {
    LoadInstructor();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedInstructor(null);
    setModalOpen(true);
  };

  // 🔑 Función de cierre que RECÁRGA la tabla
  const handleCloseAndReload = () => {
    setModalOpen(false);
    setSelectedInstructor(null);
    LoadInstructor();
  };

  const handleClosePerfilModal = () => {
    setModalCreatePerfil(false);
    LoadInstructor(); // Recargar si un nuevo perfil afecta el filtrado
  };

  return (
    <div>
      <Table
        tableTitle="Listar Instructores"
        nameValue={nameValueInstructor}
        labelUserDisabled="Instructores desactivados"
        fetchUsuariosDesactivados={getInstructoresContratoDesactivados}
        dataTable={instructor}
        functionModal={handleOpenCreateModal} // Abre el modal para crear
        openCreatePerfil={() => setModalCreatePerfil(true)}
        reloadTable={LoadInstructor} // Para eliminaciones/activaciones
        activarUsuariosPorLote={(ids) =>
          activarInstructoresPorLote("Instructor contrato", ids)
        }
      />

      {/* Modal de CREACIÓN / EDICIÓN de Instructor */}
      <Dialog
        header={selectedInstructor ? "Editar Instructor" : "Nuevo Instructor"}
        visible={openModal}
        style={{ width: "750px" }}
        onHide={() => setModalOpen(false)} // No recarga si solo se cierra con ESC o clic fuera
        modal
      >
        <FormInstructor
          closeModal={handleCloseAndReload} // 🟢 CORRECCIÓN: Al cerrar el formulario por éxito, se llama a LoadInstructor
          initialData={selectedInstructor}
        />
      </Dialog>

      {/* Modal de Creación de Perfil */}
      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
        modal
      >
        <FormPerfil closeModal={handleClosePerfilModal} />{" "}
        {/* Cierra y recarga */}
      </Dialog>
    </div>
  );
}

// --------------------------------------------------------------------------------

// --- COMPONENTE: TableAdministrativo ---
export function TableAdministrativo() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [administrativos, setAdministrativos] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  async function LoadAdministrativos() {
    try {
      const data = await GetDataAdministrativo();
      const administrativosFiltrados = data.filter((item) =>
        item.perfile?.nombre?.toLowerCase().includes("administrativo")
      );
      const flattened = administrativosFiltrados.map((item) => ({
        ...item,
        tipoPerfil: item.perfile?.nombre || "Sin perfil",
      }));
      setAdministrativos(flattened);
    } catch (error) {
      console.error("Error al cargar administrativos:", error);
    }
  }

  useEffect(() => {
    LoadAdministrativos();
  }, []);

  const handleOpenCreateModal = () => {
    setUsuarioSeleccionado(null);
    setModalOpen(true);
  };

  // 🔑 Función de cierre que RECÁRGA la tabla (usada por FormAdministrativo)
  const handleCloseAndReload = () => {
    setModalOpen(false);
    setUsuarioSeleccionado(null);
    LoadAdministrativos();
  };

  const handleClosePerfilModal = () => {
    setModalCreatePerfil(false);
    LoadAdministrativos(); // Recargar si un nuevo perfil afecta el filtrado
  };

  return (
    <div>
      <Table
        tipoEntidad="Administrativo"
        activarUsuariosPorLote={(ids) =>
          activarInstructoresPorLote("Administrativo contrato", ids)
        }
        tableTitle="Listar Administrativos"
        labelUserDisabled="Administrativos desactivados"
        nameValue={nameValueAdministrativo}
        dataTable={administrativos}
        functionModal={handleOpenCreateModal} // Abre modal para crear
        openCreatePerfil={() => setModalCreatePerfil(true)}
        reloadTable={LoadAdministrativos} // Para recargas externas, eliminaciones, etc.
        fetchUsuariosDesactivados={getAdministrativosContratoDesactivados}
        onEditUser={(usuario) => {
          setUsuarioSeleccionado(usuario);
          setModalOpen(true);
        }}
      />

      {/* Modal de CREACIÓN / EDICIÓN de Administrativo */}
      <Dialog
        header={
          usuarioSeleccionado
            ? "Actualizar Administrativo"
            : "Nuevo Administrativo"
        }
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => {
          setModalOpen(false);
          setUsuarioSeleccionado(null);
        }} // No recarga si solo se cierra con ESC o clic fuera
        modal
      >
        <FormAdministrativo
          closeModal={handleCloseAndReload} // 🟢 CORRECCIÓN: Al cerrar el formulario por éxito, se llama a LoadAdministrativos
          usuarioSeleccionado={usuarioSeleccionado}
        />
      </Dialog>

      {/* Modal de Creación de Perfil */}
      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
        modal
      >
        <FormPerfil closeModal={handleClosePerfilModal} />{" "}
        {/* Cierra y recarga */}
      </Dialog>
    </div>
  );
}

// --------------------------------------------------------------------------------

// --- COMPONENTE: TableAprendizs ---
export function TableAprendizs() {
  const [openModal, setModalOpen] = useState(false);
  const [openModalCreatePerfil, setModalCreatePerfil] = useState(false);
  const [aprendices, setAprendices] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Añadido para mejor UX

  async function LoadAprendices() {
    setIsLoading(true);
    try {
      const data = await GetDataAprendiz();
      const aprendicesFiltrados = data.filter((item) =>
        item.perfile?.nombre?.toLowerCase().includes("aprendiz")
      );
      const flattened = aprendicesFiltrados.map((item) => {
        const ficha = item.fichas || {};
        return {
          ...item,
          nombrePrograma: ficha.nombrePrograma || "Sin programa",
          jornada: ficha.jornada || "Sin jornada",
          numeroFicha: ficha.numeroFicha || "Sin ficha",
          icon:
            ficha.jornada === "Mañana"
              ? "pi pi-sun"
              : ficha.jornada === "Tarde"
              ? "pi pi-cloud"
              : ficha.jornada === "Noche"
              ? "pi pi-moon"
              : "pi pi-question",
        };
      });
      setAprendices(flattened);
    } catch (error) {
      console.error("Error al cargar aprendices:", error);
      setAprendices([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    LoadAprendices();
  }, []);

  // 🔑 Función de cierre que RECÁRGA la tabla (usada por FormAprendiz)
  const handleCloseAndReload = async () => {
    setModalOpen(false);
    // Nota: Tu lógica original de reloadAprendices tenía un setTimeout.
    // Usaremos la lógica LoadAprendices simplificada para una recarga inmediata.
    await LoadAprendices();
  };

  const handleClosePerfilModal = () => {
    setModalCreatePerfil(false);
    LoadAprendices(); // Recargar si un nuevo perfil afecta el filtrado
  };

  // Tu lógica original de reloadAprendices era muy compleja y potencialmente ineficiente.
  // La he reemplazado por la función LoadAprendices en los callbacks.

  return (
    <div>
      <TableAprendiz
        tableTitle="Listar Aprendices"
        nameValue={nameValueAprendiz}
        dataTable={aprendices}
        functionModal={() => setModalOpen(true)} // Abre modal para crear
        openCreatePerfil={() => setModalCreatePerfil(true)}
        reloadTable={LoadAprendices} // Usar LoadAprendices para recargas
        isLoading={isLoading} // Pasar estado de carga
      />

      {/* Modal de CREACIÓN de Aprendiz */}
      <Dialog
        header="Nuevo Aprendiz"
        visible={openModal}
        style={{ width: "850px" }}
        onHide={() => setModalOpen(false)}
        modal
      >
        <FormAprendiz closeModal={handleCloseAndReload} />{" "}
      </Dialog>

      {/* Modal de Creación de Perfil */}
      <Dialog
        header="Nuevo Perfil"
        visible={openModalCreatePerfil}
        style={{ width: "450px" }}
        onHide={() => setModalCreatePerfil(false)}
        modal
      >
        <FormPerfil closeModal={handleClosePerfilModal} />{" "}
        {/* Cierra y recarga */}
      </Dialog>
    </div>
  );
}
