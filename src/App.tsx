import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import useAuthorization from "./hooks/useAuth";
import { useModalStore, useSocketStore, useUserStore } from "./context/userStore";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import Modal from "./components/modal/Modal";

function App() {
  const { openModal, toggleModal } = useModalStore();
  const { user } = useUserStore();
  const { socketData, setSocketData } = useSocketStore();
  const navigate = useNavigate();
  const stompClient = useStompClient();

  useAuthorization(); // Hook que realiza la autorización del user

  useSubscription(`/queue/notifications/${user?.id}`, (message) => {
    const parsedMessage = JSON.parse(message.body);
    setSocketData(parsedMessage);
    toggleModal();
  });

  const handleRequest = (action : string) => {
    fetch(`http://localhost:8090/api/message/professional-accepted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          }}
          onClose={() => {
            handleRequest("cancel");
            toggleModal(); // Cierra el modal
          }}
        />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
