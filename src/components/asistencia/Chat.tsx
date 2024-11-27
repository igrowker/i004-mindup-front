// Chat.tsx
import { useState, FormEvent } from "react";
import InputChat from "./InputChat";
import Messages from "./Messages";

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola, Miguel. Estoy aquí contigo. ¿Cómo puedo ayudarte?",
      sender: "bot",
    },
  ]);


  const handleNewMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user" },
    ]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto">
      {/* Mostrar mensajes */}
      <Messages messages={messages} />

      {/* Input para enviar mensajes */}
      <InputChat onSendMessage={handleNewMessage} />
    </div>
  );
}

export default Chat;
