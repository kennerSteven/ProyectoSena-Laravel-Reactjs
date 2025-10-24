export default async function sendDataFetch(data, url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Éxito:", result);
      return result;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en sendDataFetch:", error);
    throw error;
  }
}