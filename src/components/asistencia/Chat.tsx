import { useEffect, useState } from "react";
import InputChat from "./InputChat";
import Messages from "./Messages";
import { useSocketStore, useUserStore } from "../../context/userStore";
import { useStompClient, useSubscription } from "react-stomp-hooks";

interface ChatProps {
  onSenderChange: (sender: string, imgSender?: string) => void;
}

interface Message {
  id: number;
  text: string;
  sender: boolean;
}

interface ChatMessage {
  patientId: string;
  sender: string;
  imgSender?: string;
  content: string;
}

function Chat({ onSenderChange }: ChatProps) {
  const { socketData } = useSocketStore();
  const profesional = socketData?.professionalId;
  const { user } = useUserStore();
  const stompClient = useStompClient();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hola, Miguel. Estoy aquí contigo. ¿Cómo puedo ayudarte?",
      sender: user?.id === profesional,
    },
  ]);

  const handleReceivedMessage = (message: ChatMessage) => {
    const isInitMessage = message.content === "";
    const isOwnMessage = message.sender === user?.name;

    if (isInitMessage && !isOwnMessage) {
      onSenderChange(message.sender, message.imgSender);
    } else if (!isInitMessage) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: message.content,
          sender: user?.id === message.sender,
        },
      ]);
    }
  };

  useSubscription("/queue/reply-" + profesional, (message) => {
    try {
      const parsedMessage = JSON.parse(message.body);
      handleReceivedMessage(parsedMessage);
    } catch (error) {
      console.error("Error al procesar mensaje:", error);
    }
  });

  useEffect(() => {
    if (!stompClient || !user?.name || !profesional) return;

    const initialMessage: ChatMessage = {
      patientId: profesional,
      sender: user.name,
      imgSender: user.image,
      content: "",
    };

    const sendMessage = () => {
      stompClient.publish({
        destination: `/queue/reply-${profesional}`,
        body: JSON.stringify(initialMessage),
      });
    };

    sendMessage();

    if (user?.id === profesional) {
      setTimeout(sendMessage, 500);
    }
  }, [stompClient, profesional, user]);

  return (
    <div className="flex flex-col h-[80vh] max-w-md mx-auto">
      <Messages messages={messages} />
      <InputChat profesionalId={profesional} />
    </div>
  );
}

export default Chat;
