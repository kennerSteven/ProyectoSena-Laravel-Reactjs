import * as yup from "yup";

const SchemaValidationRegisterVehicle = yup.object({
  placa: yup
    .string()
    .min(6, "La placa debe tener exactamente 6 caracteres")
    .max(6, "La placa debe tener exactamente 6 caracteres")
    .required("La placa es obligatoria"),

  tipoVehiculo: yup
    .string()
    .oneOf(
      ["moto", "carro", "bus", "camion", "campero"],
      "Tipo de vehículo inválido"
    )
    .required("Selecciona el tipo de vehículo"),
});

export default SchemaValidationRegisterVehicle;
