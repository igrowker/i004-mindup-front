export const getDatesPatient = async (userId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/appointment/patient/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export const getDatesPsychologist = async (userId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/appointment/patient/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export const cancelDate = async (dateId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/appointment/${dateId}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la cita");
    }
    const res = await response.json();
    console.log(res);
    return await res;
  } catch (error) {
    throw error;
  }
};

export const confirmDate = async (dateId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/appointment/${dateId}/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la cita");
    }
    const res = await response.json();
    console.log(res);
    return await res;
  } catch (error) {
    throw error;
  }
}

export const getAppointmentByDate = async (date: string, userId: string) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${apiUrl}/appointment/psychologist/appointment-date`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          psychologistId: userId,
          date: date,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las citas");
    }

    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};
