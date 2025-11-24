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
    `http://127.0.0.1:8000/api/usuario/update/${id}`, // ✅ sin salto de línea
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar");
  return await response.json();
}

export async function updateAprendiz(id, payload) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/usuario/update/${id}`,
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
    throw new Error("Error al obtener datos del carnet");
  }

  const usuario = await response.json();
  console.log("Datos del usuario:", usuario);
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

// POST /api/fichas
export async function onSubmitFicha(payload) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/ficha/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error al crear la ficha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en onSubmitFicha:", error);
    throw error;
  }
}

// PUT /api/fichas/:id
export async function updateFicha(id, payload) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/ficha/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la ficha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updateFicha:", error);
    throw error;
  }
}

export async function getFichas() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/ficha/activas", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fichas recibidas:", data);
    return Array.isArray(data) ? data : data.fichas || [];
  } catch (error) {
    console.error("Error al obtener fichas:", error);
    return [];
  }
}

export async function getUsuariosDeFicha(id) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/ficha/listarusuariosdelaFicha/${id}`
    );
    if (!response.ok) throw new Error("Error al obtener usuarios de la ficha");
    const data = await response.json();
    return Array.isArray(data.ficha?.usuarios) ? data.ficha.usuarios : [];
  } catch (error) {
    console.error("Error en getUsuariosDeFicha:", error);
    return [];
  }
}

export const desactivarFicha = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/ficha/desactivar/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al desactivar la ficha: ${errorText}`);
    }

    return await response.json(); // opcional: Laravel puede devolver mensaje
  } catch (error) {
    console.error("Error en desactivarFicha:", error);
    throw error;
  }
};

export const deleteFicha = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/ficha/destroy/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la ficha");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en deleteFicha:", error);
    throw error;
  }
};

export async function getFichasDesactivadas() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/ficha/listarFichasDesactivadas",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // contiene { message, fichas }
  } catch (error) {
    console.error("Error al obtener fichas desactivadas:", error);
    return { fichas: [] };
  }
}

export async function deleteFichasMasivo(ids = []) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/ficha/destroyMasivo",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      }
    );

    console.log(ids);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    const data = await response.json();
    return data; //
  } catch (error) {
    console.error("Error al eliminar fichas masivamente:", error);
    throw error;
  }
}

export async function getAdministrativosContratoDesactivados() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/administrativos-contrato/desactivados",
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return Array.isArray(data.usuarios) ? data.usuarios : [];
  } catch (error) {
    console.error("Error al obtener instructores desactivados:", error);
    return [];
  }
}

export async function getInstructoresContratoDesactivados() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/instructores-contrato/desactivados",
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return Array.isArray(data.usuarios) ? data.usuarios : [];
  } catch (error) {
    console.error("Error al obtener instructores desactivados:", error);
    return [];
  }
}

export async function activarUsuariosPorTipo(tipo) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/usuarios/activar-masivo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del backend:", data);
      throw new Error(data.message || "Error en la activación masiva");
    }

    return data;
  } catch (error) {
    console.error("Error al activar usuarios:", error);
    throw error;
  }
}

export async function activarInstructorPorId(id) {
  return await fetch(`/api/instructores/${id}/activar`, { method: "POST" });
}

export async function activarInstructoresPorLote(tipo, ids) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/usuarios/activar-masivo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ tipo, ids }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del backend:", data);
      throw new Error(data.message || "Error en la activación masiva");
    }

    return data;
  } catch (error) {
    console.error("Error al activar instructores:", error);
    throw error;
  }
}

export async function fetchVisitantes() {
  try {
    const response = await fetch("http://localhost:8000/api/usuario/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success || !Array.isArray(data.data)) {
      throw new Error(data.message || "Respuesta inesperada del backend");
    }

    return data.data;
  } catch (error) {
    console.error("Error al obtener visitantes:", error);
    return []; // Fallback institucional
  }
}
export const onSubmitVisitante = async (payload) => {
  try {
    const response = await fetch("http://localhost:8000/api/usuario/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text(); // 🔍 Leer como texto
    let result;

    try {
      result = JSON.parse(text); // ✅ Parsear manualmente
    } catch {
      console.error("Respuesta no es JSON:", text);
      return null;
    }

    if (!response.ok) {
      console.error("Error en respuesta:", result);
      return null;
    }

    return result; // ✅ Aquí es donde debe retornar
  } catch (error) {
    console.error("Error en onSubmitVisitante:", error);
    return null;
  }
};

export async function deleteUsuario(id) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/usuario/destroy/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Agrega autorización si es necesario:
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en deleteUsuario:", error);
    throw error;
  }
}

export function getRegisters(url) {
  return async function () {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error en respuesta GET:", data);
        throw new Error(data.message || `Error ${response.status}`);
      }

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error en getRegisters:", error);
      return [];
    }
  };
}

export function createRegister(url) {
  return async function (params) {
    try {
      if (!params?.numeroDocumento) {
        throw new Error("Número de documento no proporcionado");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ numeroDocumento: params.numeroDocumento }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Respuesta del backend:", data);
        throw new Error(data.message || `Error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("Error en createRegister:", error);
      throw error;
    }
  };
}

export function createSalida(url) {
  return async function (params) {
    try {
      if (!params?.numeroDocumento) {
        throw new Error("Número de documento no proporcionado");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ numeroDocumento: params.numeroDocumento }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Respuesta del backend:", data);
        throw new Error(data.message || `Error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("Error en createRegister:", error);
      throw error;
    }
  };
}

export function createRegisterGranja(url) {
  return async function (params) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    });

    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Respuesta vacía o malformada:", error);
      throw new Error("Respuesta del backend no es JSON válido");
    }
  };
}

export const createRegisterSalidaGranja = async (params) => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/entradaysalidagranja/salidagranja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Respuesta vacía o malformada:", error);
      throw new Error("Respuesta del backend no es JSON válido");
    }
  } catch (error) {
    console.error("Error en la solicitud de salida granja:", error);
    throw error;
  }
};

export async function getRegistersGranja() {
  try {
    const response = await fetch(
      "http://localhost:8000/api/entradaysalidagranja/index",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Respuesta no OK:", errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error("La respuesta no es una lista de registros");
      }
      console.log("Historial granja", data);
      return data;
    } catch (error) {
      console.error("Error al parsear JSON:", text);
      throw new Error("La respuesta del backend no es JSON válido", error);
    }
  } catch (error) {
    console.error("Error en getRegistersGranja:", error);
    return [];
  }
}

export async function registrarSalidaMasiva(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al procesar salida masiva");
    }

    return {
      success: true,
      message: data.message || "Salida registrada correctamente",
      data,
    };
  } catch (error) {
    console.error("Error en registrarSalidaMasiva:", error);
    return {
      success: false,
      message: error.message || "No se pudo completar la operación.",
    };
  }
}
