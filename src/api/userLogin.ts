export interface LoginData {
  email: string;
  password: string;
}

export const userLogin = async (loginData: LoginData) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
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
