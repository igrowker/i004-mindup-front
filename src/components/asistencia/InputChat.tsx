import { useState, FormEvent } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useStompClient } from "react-stomp-hooks";
import { useUserStore } from "../../context/userStore";

interface InputChatProps {
  profesionalId: any; // Permitir que sea opcional para manejar escenarios sin datos
}

export default function InputChat({ profesionalId }: InputChatProps) {
  const [inputValue, setInputValue] = useState("");
  const stompClient = useStompClient();
  const { user } = useUserStore();

  const isInputValid = (): boolean => {
    if (!profesionalId) {
      console.warn("Profesional ID no disponible.");
      return false;
    }
    if (!stompClient) {
      console.warn("Cliente STOMP no inicializado.");
      return false;
    }
    return true;
  };
  


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isInputValid()) return;

    const message = {
      patientId: user?.id,
      sender: user?.id,
      content: inputValue.trim(),
    };

    stompClient?.publish({
      destination: `/queue/reply-${profesionalId}`,
      body: JSON.stringify(message),
    });

    setInputValue(""); // Limpiar el input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sticky bottom-0 flex items-center"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu mensaje aquí"
          className="w-full p-2 pr-12 border-2 rounded-lg focus:outline-none focus:border-[#7a5fe7] h-[50px]"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#7a5fe7] hover:bg-[#f3f3f3] p-1 rounded-full"
          disabled={!inputValue.trim()} // Desactivar si el input está vacío
        >
          <LuSendHorizontal className="size-6" />
        </button>
      </div>
    </form>
  );
}

