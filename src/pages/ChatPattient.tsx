import Header from "../components/header/Header";
import Chat from "../components/asistencia/Chat";
import { useState } from "react";
import Loading from "../components/shared/Loading";
import { FaUser } from "react-icons/fa6";

interface SenderInfo {
  name: string;
  image?: string;
}

const ChatPattient = () => {
  const [sender, setSender] = useState<SenderInfo>({ name: "", image: undefined });

  const handleSenderChange = (name: string, image?: string) => {
    setSender({ name, image });
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <Header />
      <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4">
        {sender.image ? (
          <img
            src={sender.image}
            alt="Foto del profesional"
            className="size-10 bg-[#989898] rounded-full object-cover"
          />
        ) : (
          <FaUser className="bg-[#989898] fill-zinc-600 rounded-full size-10" />
        )}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg">
            {sender.name ? (
              `Estás hablando con ${sender.name}`
            ) : (
              <div className="flex items-center gap-2">
                <span>Conectando con un profesional</span>
                <Loading text={false} />
              </div>
            )}
          </h2>
        </div>
      </section>

      <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4">
        <Chat onSenderChange={handleSenderChange} />
      </section>
    </div>
  );
};

export default ChatPattient;
