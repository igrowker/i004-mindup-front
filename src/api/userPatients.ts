export const getPatients = async (userId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${apiUrl}/appointment/psychologist-patients/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las citas");
    }
    const res = await response.json();
    return await res;
  } catch (error) {
    throw error;
  }
};
