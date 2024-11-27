import { useState, FormEvent } from "react";
import { LuSendHorizonal } from "react-icons/lu";

interface InputChatProps {
  onSendMessage: (text: string) => void; // Función para enviar mensajes al componente padre
}

export default function InputChat({ onSendMessage }: InputChatProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    onSendMessage(inputValue); // Enviar mensaje al componente padre
    setInputValue(""); // Limpiar el campo de entrada
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
        >
          <LuSendHorizonal className="size-6" />
        </button>
      </div>
    </form>
  );
}
