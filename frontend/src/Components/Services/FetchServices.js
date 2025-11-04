import sendDataFetch from "./Component/SenDataFetch";
import GetDataFetch from "./Component/GetDataFetch";

export const onSubmitPerfil = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/perfiles/store");
};

export async function GetDataInstructor() {
  try {
    const result = await GetDataFetch(
      "http://127.0.0.1:8000/api/usuario/index"
    );
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataInstructor:", error);
    return [];
  }
}

export async function GetDataAdministrativo() {
  try {
    const result = await GetDataFetch(
      "http://127.0.0.1:8000/api/usuario/index"
    );
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataInstructor:", error);
    return [];
  }
}

export async function GetDataAprendiz() {
  try {
    const result = await GetDataFetch(
      "http://127.0.0.1:8000/api/usuario/index"
    );
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataAprendiz:", error);
    return [];
  }
}

export const onSubmitAdministrativo = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/usuario/store");
};

export const onSubmitAprendiz = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/usuario/store");
};

export const onSubmitInstructor = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/usuario/store");
  console.log(data);
};

export const onSubmitLogin = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/login");
};

export const onSubmitFoormacion = async (data) => {
  await sendDataFetch(data, "http://127.0.0.1:8000/api/ficha/store");
};
export async function updateInstructor(id, payload) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/usuario/update/${id}
`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar");
  return await response.json();
}

export async function updateAdministrativo(id, payload) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/usuario/update/${id}
`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar");
  return await response.json();
}

export async function deleteInstructor(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/usuario/destroy/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar el instructor");
  }

  return await res.json();
}

export async function getIdForCarnet(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/usuario/show/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error("Error del backend:", errorText);
    throw new Error("Error al obtener datos del carnet");
  }

  const usuario = await response.json();
  console.log("Datos del usuario:", usuario); // ✅ verificación visual
  return usuario;
}

export async function getAllRegisters() {
  try {
    const result = await GetDataFetch(
      "http://127.0.0.1:8000/api/entradaysalidagym/index"
    );
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error en GetDataAprendiz:", error);
    return [];
  }
}
