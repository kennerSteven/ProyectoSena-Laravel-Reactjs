  export default async function GetDataFetch(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Éxito:", result);
      return result;
    } catch (error) {
      console.error("Error en GetDataFetch:", error);
      throw error;
    }
  }
  