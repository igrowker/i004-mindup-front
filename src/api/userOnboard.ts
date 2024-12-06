export interface OnBoardData {
  gender: string;
  specialty: string;
  tuition: string;
  zone: string;
  birth: string;
  information: string;
}

export const userOnBoard = async (onBoardData: OnBoardData, userId: string) => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_COREURL;
  try {
    const response = await fetch(`${apiUrl}/user/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(onBoardData),
    });

    return response;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error;
  }
};
