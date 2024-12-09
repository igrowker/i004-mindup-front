export interface UserData {
    name: string;
    password: string;
    email: string;
    role: "PATIENT" | "PSYCHOLOGIST";
  }
  
  export const userRegister = async (userData: UserData) => {
    const apiUrl = import.meta.env.VITE_COREURL;
    console.log(userData);
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || "Error en el registro");
      }
  
      return await response.json(); // Devuelve los datos exitosos
    } catch (error) {
      throw error; // Lanza el error para que sea manejado donde se llame
    }
  };
  