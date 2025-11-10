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
    return data; // ✅ puedes devolver la ficha creada
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
    return data; // ✅ puedes devolver la ficha actualizada
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

    // ✅ blindaje: extrae el array si viene dentro de un objeto
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
    const response = await fetch(`http://localhost:8000/api/ficha/desactivar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
   
      },
    });

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
    const response = await fetch(`http://localhost:8000/api/ficha/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const response = await fetch("http://127.0.0.1:8000/api/ficha/listarFichasDesactivadas", {
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
    return data; // contiene { message, fichas }
  } catch (error) {
    console.error("Error al obtener fichas desactivadas:", error);
    return { fichas: [] };
  }
}


export async function deleteFichasMasivo(ids = []) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/ficha/destroyMasivo", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }), // Enviamos array de IDs
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    const data = await response.json();
    return data; // { message, eliminadas, noEliminadas }
  } catch (error) {
    console.error("Error al eliminar fichas masivamente:", error);
    throw error;
  }
}




export async function getAdministrativosContratoDesactivados() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/administrativos-contrato/desactivados", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json(); 
    console.log(data)
    return Array.isArray(data.usuarios) ? data.usuarios : [];
  } catch (error) {
    console.error("Error al obtener instructores desactivados:", error);
    return [];
  }
}


export async function getInstructoresContratoDesactivados() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/instructores-contrato/desactivados", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json(); 
    console.log(data)
    return Array.isArray(data.usuarios) ? data.usuarios : [];
  } catch (error) {
    console.error("Error al obtener instructores desactivados:", error);
    return [];
  }
}



export async function activarUsuariosPorTipo(tipo) {
  try {
    const response = await fetch("http://localhost:8000/api/usuarios/activar-masivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tipo }),
    });

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

export async function activarInstructoresPorLote(ids) {
  return await fetch(`/api/instructores/activar-lote`, {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
  });
}



export async function activarUsuarioPorId(id) {
  try {
    const response = await fetch(`http://localhost:8000/api/usuarios/${id}/activar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al activar el usuario");
    }

    return data; 
  } catch (error) {
    console.error("Error al activar usuario:", error);
    throw error;
  }
}