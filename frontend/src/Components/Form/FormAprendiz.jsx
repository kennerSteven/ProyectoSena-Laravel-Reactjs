import { useEffect, useState, useRef } from "react";
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import InputAutoComplete from "../Ui/InputAutocomplete";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import useFichaFetch from "../Hooks/UseFichaAprendiz";
import HandleValidationAprendiz from "./Validation/HandleValidation/HandleEntitie/HandleValidation.Aprendiz";
import SchemaValidationUser from "./Validation/SchemaValidation/SchemaValidationUser";

export default function FormAprendiz({ closeModal, usuarioSeleccionado }) {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationUser);

  const { perfil } = useTipoPerfilFetch("Aprendiz");
  const { fichas } = useFichaFetch();

  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Referencia para el stream de la cámara
  const streamRef = useRef(null);

  const { onSubmit, onError } = HandleValidationAprendiz({
    reset,
    perfiles: perfil ? [perfil] : [],
    closeModal,
    perfil: "Aprendiz",
    capturedImage,
    usuarioSeleccionado,
  });

  const getFotoUrl = (foto) => {
    const baseURL = "http://127.0.0.1:8000";
    if (!foto) return null;
    if (foto.startsWith("http")) return foto;
    if (foto.startsWith("storage/fotos")) return `${baseURL}/${foto}`;
    return `${baseURL}/storage/fotos/${foto}`;
  };

  useEffect(() => {
    if (usuarioSeleccionado && perfil && fichas.length > 0) {
      const fichaSeleccionada = fichas.find(
        (f) => f.id === usuarioSeleccionado.idficha
      );

      const fotoUrl = getFotoUrl(usuarioSeleccionado.foto);
      setCapturedImage(fotoUrl);
      reset({
        nombre: usuarioSeleccionado.nombre || "",
        apellido: usuarioSeleccionado.apellido || "",
        tipoDocumento: usuarioSeleccionado.tipoDocumento || "",
        numeroDocumento: usuarioSeleccionado.numeroDocumento || "",
        telefono: usuarioSeleccionado.telefono || "",
        tipoSangre: usuarioSeleccionado.tipoSangre || "",
        ficha_id: fichaSeleccionada || null,
        tipoPerfil: perfil.id,
        foto: fotoUrl || "",
      });
    }
  }, [usuarioSeleccionado, perfil, fichas, reset]);

  useEffect(() => {
    if (showCamera && videoRef.current) {
      // Función asíncrona para manejar la obtención del stream
      const startCamera = async () => {
        try {
          // Obtiene el MediaStream
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          streamRef.current = stream; // Guarda el stream en la referencia
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
        }
      };
      startCamera();
    } // Función de limpieza (Cleanup function)

    return () => {
      // Si hay un stream guardado, lo detiene.
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null; // Limpia la referencia
      }
    };
  }, [showCamera]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d"); // Aseguramos que el canvas tenga las dimensiones del video
      canvas.width = video.videoWidth || 300;
      canvas.height = video.videoHeight || 200;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setValue("foto", imageData);
      stopCamera(); // ✅ Detiene y cierra la cámara al tomar la foto
    }
  }; // 1. Envolvemos el onSubmit original para detener la cámara

  const handleFormSubmit = async (data, event) => {
    // Si la cámara está activa, la detenemos
    if (showCamera) {
      stopCamera();
    } // Ejecutamos la lógica de envío
    onSubmit(data, event);
  };

  return (
    <div className="container">
      <form
        className="row mt-4 formUsers mx-auto" // 2. Usamos el nuevo handler que incluye la lógica para apagar la cámara
        onSubmit={handleSubmit(handleFormSubmit, onError)}
      >
        <div className="col-12">
          <div className="d-flex gap-4">
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

          <div className="d-flex gap-3 mt-1">
            <SelectOptions
              register={register}
              name="tipoDocumento"
              nameSelect="Tipo documento"
              error={errors.tipoDocumento}
              values={[
                { value: "cc", label: "Cédula de ciudadanía" },
                { value: "ti", label: "Tarjeta de identidad" },
              ]}
            />

            <InputField
              typeInput="text"
              name="numeroDocumento"
              register={register}
              error={errors.numeroDocumento}
              labelName="Número de documento"
            />
          </div>

          <div className="row mt-2">
            <div className="col-lg-6">
              <InputField
                typeInput="number"
                name="telefono"
                register={register}
                error={errors.telefono}
                labelName="Teléfono"
              />
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

              <div className="my-2">
                <InputAutoComplete
                  objFormacion={fichas}
                  name="ficha_id"
                  control={control}
                  label="Ficha de formación"
                />
              </div>

              <SelectOptions
                name="tipoPerfil"
                register={register}
                error={errors.tipoPerfil}
                nameSelect="Perfil"
                values={
                  perfil ? [{ value: perfil.id, label: perfil.nombre }] : []
                }
              />
            </div>

            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-4">
              <div style={{ maxWidth: "400px", width: "100%" }}>
                {capturedImage ? (
                  <div className="text-center">
                    <img
                      src={capturedImage}
                      alt="Foto del aprendiz"
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
                      onClick={handleCapturePhoto} // ✅ Usamos la función optimizada
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

                {errors.foto && (
                  <p className="text-danger text-center mt-2"></p>
                )}
              </div>
            </div>
          </div>

          <input
            type="hidden"
            {...register("foto")}
            value={capturedImage || ""}
          />

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

        <Toaster
          position="top-right"
          toastOptions={{ style: { marginTop: "100px" } }}
        />
      </form>
    </div>
  );
}
