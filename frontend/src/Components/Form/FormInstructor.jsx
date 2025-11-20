import { useEffect, useState, useRef } from "react";
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import HandleValidationInstructor from "./Validation/HandleValidation/HandleEntitie/HandleValidation.Instructor";
import SchemaValidationInstructor from "./Validation/SchemaValidation/SchemaValidationInstructor";

export default function FormInstructor({ closeModal, usuarioSeleccionado }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationInstructor);

  const { perfiles } = useTipoPerfilFetch("Instructor");

  const opcionesPerfil = perfiles.map((p) => ({
    value: p.id,
    label: p.nombre,
  }));

  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { onSubmit, onError } = HandleValidationInstructor({
    reset,
    perfiles,
    closeModal,
    perfil: "Instructor",
    usuarioSeleccionado,
    capturedImage,
  });

  const getFotoUrl = (foto) => {
    const baseURL = "http://127.0.0.1:8000";
    if (!foto) return null;
    if (foto.startsWith("http")) return foto;
    if (foto.startsWith("storage/fotos")) return `${baseURL}/${foto}`;
    return `${baseURL}/storage/fotos/${foto}`;
  };

  useEffect(() => {
    if (usuarioSeleccionado && perfiles.length > 0) {
      reset({
        nombre: usuarioSeleccionado.nombre || "",
        apellido: usuarioSeleccionado.apellido || "",
        tipoDocumento: usuarioSeleccionado.tipoDocumento || "",
        numeroDocumento: usuarioSeleccionado.numeroDocumento || "",
        telefono: usuarioSeleccionado.telefono || "",
        tipoSangre: usuarioSeleccionado.tipoSangre || "",
        tipoPerfil: usuarioSeleccionado.perfile?.id || perfiles[0]?.id || "",
      });

      if (usuarioSeleccionado.foto) {
        setCapturedImage(getFotoUrl(usuarioSeleccionado.foto));
      }
    }
  }, [usuarioSeleccionado, reset, perfiles]);

  useEffect(() => {
    if (showCamera && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error al acceder a la cámara:", err);
        });
    }
  }, [showCamera]);

  return (
    <div>
      <form className="row" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mt-2">
          <div className="d-flex gap-4 mb-3">
            <InputField
              typeInput="text"
              name="nombre"
              register={register}
              error={errors.nombre}
              labelName="Nombre"
            />
            <InputField
              typeInput="text"
              name="apellido"
              register={register}
              error={errors.apellido}
              labelName="Apellido"
            />
          </div>

          <div className="d-flex gap-3 mb-3">
            <SelectOptions
              register={register}
              name="tipoDocumento"
              nameSelect="Tipo documento"
              error={errors.tipoDocumento}
              values={[
                { value: "cc", label: "Cédula de ciudadanía" },
                { value: "otro", label: "Otro..." },
              ]}
            />
            <InputField
              typeInput="text"
              name="numeroDocumento"
              register={register}
              error={errors.numeroDocumento}
              labelName="Documento"
            />
          </div>

          <div className="row">
            <div className="col-lg-6 ">
              <div className=" gap-4">
                <InputField
                  typeInput="number"
                  name="telefono"
                  register={register}
                  error={errors.telefono}
                  labelName="Teléfono"
                />
                <div className="my-2">
                  <SelectOptions
                    register={register}
                    name="tipoSangre"
                    nameSelect="Tipo de sangre"
                    error={errors.tipoSangre}
                    values={[
                      { value: "A+", label: "A positivo" },
                      { value: "A-", label: "A negativo" },
                      { value: "B+", label: "B positivo" },
                      { value: "B-", label: "B negativo" },
                      { value: "AB+", label: "AB positivo" },
                      { value: "AB-", label: "AB negativo" },
                      { value: "O+", label: "O positivo" },
                      { value: "O-", label: "O negativo" },
                    ]}
                  />
                </div>
              </div>

              <div className="my-2">
                <SelectOptions
                  register={register}
                  name="tipoPerfil"
                  nameSelect="Tipo de perfil"
                  error={errors.tipoPerfil}
                  values={opcionesPerfil}
                />
              </div>

              <div className="d-flex justify-content-start mt-4">
                <ButtonSubmit
                  textSend={usuarioSeleccionado ? "Actualizar" : "Guardar"}
                  textSending={
                    usuarioSeleccionado ? "Actualizando..." : "Guardando..."
                  }
                  isSubmitting={isSubmitting}
                  maxWidth={false}
                  iconButton={
                    usuarioSeleccionado ? "bi bi-pencil-square" : "bi bi-save"
                  }
                />
              </div>
            </div>

            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-4">
              <div style={{ maxWidth: "400px", width: "100%" }}>
                {capturedImage ? (
                  <div className="text-center">
                    <img
                      src={capturedImage}
                      alt="Foto del instructor"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                      onError={() =>
                        console.warn(
                          "No se pudo cargar la imagen:",
                          capturedImage
                        )
                      }
                    />
                  </div>
                ) : showCamera ? (
                  <div className="text-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      className="rounded"
                      style={{ width: "100%", maxHeight: "200px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-success mt-2"
                      onClick={() => {
                        const context = canvasRef.current.getContext("2d");
                        context.drawImage(videoRef.current, 0, 0, 300, 200);
                        const imageData =
                          canvasRef.current.toDataURL("image/png");
                        setCapturedImage(imageData);
                        setShowCamera(false);
                      }}
                    >
                      Tomar foto
                    </button>
                    <canvas
                      ref={canvasRef}
                      width="300"
                      height="200"
                      style={{ display: "none" }}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => setShowCamera(true)}
                    >
                      Activar cámara
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            style: { marginTop: "24px" },
          }}
        />
      </form>
    </div>
  );
}
