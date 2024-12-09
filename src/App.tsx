import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import useAuthorization from "./hooks/useAuth";
import { useAvailableForUrgenciesStore, useModalStore, useSocketStore, useUserStore } from "./context/userStore";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import Modal from "./components/modal/Modal";

function App() {
  const { openModal, toggleModal } = useModalStore();
  const { user } = useUserStore();
  const { socketData, setSocketData } = useSocketStore();
  const navigate = useNavigate();
  const stompClient = useStompClient();
  const {toggleAvailableForUrgencie } =
    useAvailableForUrgenciesStore();

  const apiUrl = import.meta.env.VITE_MONGOURL;
  const token = localStorage.getItem("token");

  useAuthorization(); // Hook que realiza la autorización del user

  useSubscription(`/queue/notifications/${user?.id}`, (message) => {
    const parsedMessage = JSON.parse(message.body);
    setSocketData(parsedMessage);
    toggleModal();
  });

  const handleRequest = (action : string) => {
    fetch(`${apiUrl}/professional-accepted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(socketData),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(`Respuesta al ${action}:`, data);
        stompClient?.publish({
          destination: `/queue/reply-${user?.id}`, // Notifica al paciente
          body: action === "accept" ? "ok" : "cancel",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Outlet />
      {openModal && (
        <Modal
          title="¡Un paciente necesita asistencia inmediata!"
          onClick={() => {
            navigate("chatpettient");
            toggleModal();
            handleRequest("accept");
            toggleAvailableForUrgencie();
          }}
          onClose={() => {
            handleRequest("cancel");
            toggleModal(); // Cierra el modal
            toggleAvailableForUrgencie();

          }}
        />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
