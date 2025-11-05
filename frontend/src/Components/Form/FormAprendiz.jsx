import { useEffect, useState, useRef } from "react";
import ButtonSubmit from "../Ui/ButtonSubmit";
import SelectOptions from "../Ui/SelectOptions";
import InputField from "../Ui/InputField";
import useFormWithYup from "./Validation/connectYupRhf";
import { Toaster } from "react-hot-toast";
import "../../styles/FormUsers.css";
import InputAutoComplete from "../Ui/InputAutocomplete";
import useTipoPerfilFetch from "../Hooks/UseTipoPerfil";
import useFichaFetch from "../Hooks/UseFichaAprendiz";
import HandleValidationAprendiz from "./Validation/HandleValidation/HandleEntitie/HandleValidation.Aprendiz";
import SchemaValidationUser from "./Validation/SchemaValidation/SchemaValidationUser";

export default function FormAprendiz({ closeModal }) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormWithYup(SchemaValidationUser);

  const { perfil } = useTipoPerfilFetch("Aprendiz");
  const { fichas } = useFichaFetch();
  const opcionesPerfil = perfil
    ? [{ value: perfil.id, label: perfil.nombre }]
    : [];

  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { onSubmit, onError } = HandleValidationAprendiz({
    reset,
    perfiles: perfil ? [perfil] : [],
    closeModal,
    perfil: "Aprendiz",
    capturedImage,
  });

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
    <div className="container">
      <form
        className="row mt-4 formUsers mx-auto"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* Columna izquierda */}
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

          <div className="d-flex gap-3 mt-3">
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

          <div className="row mt-3">
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
                labelName="Tipo perfil"
                values={opcionesPerfil}
              />
            </div>

            {/* Columna derecha: cámara */}
            <div className="col-lg-6 d-flex align-items-center justify-content-center mt-4">
              <div style={{ maxWidth: "400px", width: "100%" }}>
                {capturedImage ? (
                  <div className="text-center">
                    <img
                      src={capturedImage}
                      alt="Captura"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-2"
                      onClick={() => {
                        setCapturedImage(null);
                        setShowCamera(true);
                      }}
                    >
                      Retomar foto
                    </button>
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

          {/* Botón Guardar */}
          <div className="d-flex justify-content-start mt-4">
            <ButtonSubmit
              textSend="Guardar"
              textSending="Guardando..."
              isSubmitting={isSubmitting}
              maxWidth={false}
              iconButton="bi bi-save"
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
