import Header from "../components/header/Header";
import Chat from "../components/asistencia/Chat";

const ChatPattient = () => {
  return (
    <>
      <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background ">
        <Header />

        <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4">
          <img
            src="public/Imágenes/miguel.png"
            alt="Foto del profesional"
            className="size-10 bg-[#989898] rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg ">Estas hablando con Ludwing</h2>
          </div>
        </section>

        <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4 ">
          <Chat />
        </section>
      </div>
    </>
  );
};

export default ChatPattient;
