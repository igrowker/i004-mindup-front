import { useState } from "react";
import InputChat from "./InputChat";
import Messages from "./Messages";
import { useSocketStore, useUserStore } from "../../context/userStore";
import { useSubscription } from "react-stomp-hooks";

function Chat() {
  const { socketData } = useSocketStore();
  const profesionalId = socketData?.professionalId;
  const { user } = useUserStore();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola, Miguel. Estoy aquí contigo. ¿Cómo puedo ayudarte?",
      sender: user?.id === profesionalId,
    },
  ]);

  // Suscripción al broker de mensajes
  useSubscription("/queue/reply-" + profesionalId, (message) => {
    console.log(message.body);
    
    try {
      const parsedMessage = JSON.parse(message.body);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: parsedMessage.content, sender: user?.id === parsedMessage.sender },
      ]);
    } catch (error) {
      console.error("Error al parsear el mensaje:", error);
    }
  });

  return (
    <div className="flex flex-col h-[80vh] max-w-md mx-auto">
      {/* Mostrar mensajes */}
      <Messages messages={messages} />

      {/* Input para enviar mensajes */}
      <InputChat profesionalId={profesionalId} />
    </div>
  );
}

export default Chat;
