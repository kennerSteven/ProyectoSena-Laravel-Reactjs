import sendDataFetch from "./Component/SenDataFetch";
import GetDataFetch from "./Component/GetDataFetch";



export const onSubmitPerfil = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/perfiles/store");
};


export async function GetDataInstructor() {
  try {
    const result = await GetDataFetch("http://127.0.0.1:8000/api/usuario/index");
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataInstructor:", error);
    return [];
  }
}


export async function GetDataAprendiz() {
  try {
    const result = await GetDataFetch("http://127.0.0.1:8000/api/usuario/index");
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataAprendiz:", error);
    return [];
  }
}


export const onSubmitAdministrativo = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/administrativos/store");
};


export const onSubmitAprendiz = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/otra-ruta/store");
};

export const onSubmitInstructor = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/usuario/store");
  console.log(data)
};

export const onSubmitLogin = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/login");
};


export const onSubmitFoormacion = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/ficha/store");
};
