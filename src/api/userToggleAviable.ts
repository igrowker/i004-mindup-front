import { useUserStore } from "../context/userStore";

const { user } = useUserStore();

export const toggleAvailableForUrgencies = (
  currentState: boolean,
  setAvailableForUrgencies: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const apiUrl = import.meta.env.VITE_COREURL;
  const token = localStorage.getItem("token");

  fetch(`${apiUrl}/user/availability/${user?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ availability: !currentState }), // Invierte el estado
  })
    .then((r) => r.json())
    .then((data) => {
      setAvailableForUrgencies(data.availability); // Actualiza el estado
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
