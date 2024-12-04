export interface AppointmentData {
    patientId: string;
    psychologistId: string;
    date: string;
  }
  
  export const userAppointmentCreate = async (appointmentData: AppointmentData) => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_COREURL;
    console.log(appointmentData);
    try {
      const response = await fetch(`${apiUrl}/appointment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el inicio de sesión");
      }
      console.log(await response.json());
    } catch (error) {
      throw error;
    }
  };
  