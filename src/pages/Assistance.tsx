import { useEffect, useState } from "react";
import Loading from "../components/shared/Loading";
import Header from "../components/header/Header";
import Chat from "../components/asistencia/Chat";

const Assistance = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Simula una petición con un retraso de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading text />
      ) : (
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
      )}
    </>
  );
};

export default Assistance;
