export const toggleAvailableForUrgencies = (
    userId: string | undefined,
    currentState: boolean,
    setAvailableForUrgencies: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const apiUrl = import.meta.env.VITE_COREURL;
    const token = localStorage.getItem("token");
  
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
  
    fetch(`${apiUrl}/user/availability/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ availability: !currentState }),
    })
      .then((r) => r.json())
      .then((data) => {
        setAvailableForUrgencies(data.availability);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  