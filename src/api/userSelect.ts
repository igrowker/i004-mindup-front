export interface SelectData {
  isBelow35: boolean;
  gender: string;
}

export const userSelect = async (selectData: SelectData) => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_COREURL;
  try {
    const response = await fetch(`${apiUrl}/search-preference-psychologists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(selectData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el inicio de sesión");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
