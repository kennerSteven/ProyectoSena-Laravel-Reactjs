import { useState } from "react";
import Swal from "sweetalert2";
import {
  onSubmitAdministrativo,
  updateAdministrativo,
} from "../../../../Services/FetchServices";
import "../../../../../styles/ButtonSubmit.css";

export default function HandleValidationAdministrativo({
  reset,
  perfiles,
  closeModal,
  perfil: nombrePerfil,
  usuarioSeleccionado,
}) {
  const [formData, setFormData] = useState();

  const onSubmit = async (data) => {
    const perfilSeleccionado = perfiles.find(
      (p) => p.nombre?.toLowerCase() === nombrePerfil?.toLowerCase()
    );

    if (!perfilSeleccionado) {
      await Swal.fire({
        icon: "error",
        title: "Perfil no encontrado",
        text: "No se encontró el perfil solicitado",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: { confirmButton: "btn" },
        didRender: () => {
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#dc3545";
            confirmBtn.style.color = "#fff";
            confirmBtn.style.borderRadius = "10px";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "0.5rem 1.5rem";
            confirmBtn.style.cursor = "pointer";
          }
        },
      });
      return;
    }

    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      telefono: data.telefono,
      tipoSangre: data.tipoSangre,
      idperfil: perfilSeleccionado.id,
    };

    console.table(payload);
    setFormData(payload);

    try {
      if (usuarioSeleccionado?.id) {
        await updateAdministrativo(usuarioSeleccionado.id, payload);
        reset();
        closeModal(); // ✅ cerrar antes del alert

        await Swal.fire({
          icon: "success",
          title: "Administrativo actualizado",
          text: "El administrativo fue actualizado exitosamente",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: { confirmButton: "btn" },
          didRender: () => {
            const confirmBtn = Swal.getConfirmButton();
            if (confirmBtn) {
              confirmBtn.style.backgroundColor = "#00A859";
              confirmBtn.style.color = "#fff";
              confirmBtn.style.borderRadius = "10px";
              confirmBtn.style.border = "none";
              confirmBtn.style.padding = "0.5rem 1.5rem";
              confirmBtn.style.cursor = "pointer";
            }
          },
        });
      } else {
        await onSubmitAdministrativo(payload);
        reset();
        closeModal(); // ✅ cerrar antes del alert

        await Swal.fire({
          icon: "success",
          title: "Administrativo creado",
          text: "El administrativo fue guardado exitosamente",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: { confirmButton: "btn" },
          didRender: () => {
            const confirmBtn = Swal.getConfirmButton();
            if (confirmBtn) {
              confirmBtn.style.backgroundColor = "#00A859";
              confirmBtn.style.color = "#fff";
              confirmBtn.style.borderRadius = "10px";
              confirmBtn.style.border = "none";
              confirmBtn.style.padding = "0.5rem 1.5rem";
              confirmBtn.style.cursor = "pointer";
            }
          },
        });
      }
    } catch (error) {
      console.error("Error en envío:", error);

      await Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "No se pudo guardar el administrativo",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        customClass: { confirmButton: "btn" },
        didRender: () => {
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#dc3545";
            confirmBtn.style.color = "#fff";
            confirmBtn.style.borderRadius = "10px";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "0.5rem 1.5rem";
            confirmBtn.style.cursor = "pointer";
          }
        },
      });
    }
  };

  const onError = (errors) => {
    console.warn("Errores de validación:", errors);
  };

  return { onSubmit, onError, formData, closeModal };
}
