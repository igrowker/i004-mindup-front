export const userProfile = async (userId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/user/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el inicio de sesión");
    }
    const res = await response.json();
    console.log(res);
    return await res;
  } catch (error) {
    throw error;
  }
};
