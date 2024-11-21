import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SelectedCardList from "../components/selected/SelectedCardList";
import CustomButton from "../components/shared/CustomButton";
import Header from "../components/header/Header";

function SelectedProfessional() {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const selected = [
    //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA
    {
      name: "Trinidad García",
      type: "Cognitivo - Conductual",
    },
    {
      name: "Maria Gomez",
      type: "Cognitivo - Conductual",
    },
    {
      name: "Juana Ortega",
      type: "Psicoanalítica",
    },
  ];

  useEffect(() => {
    // Simula una petición con un retraso de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // Pantalla de carga mientras isLoading es true
        <article className="h-screen flex justify-center items-center flex-col w-full gap-8">
          <img src="public/Gifs/Loading.gif" alt="Gif de carga" />
          <p className="text-wrap font-medium w-52 text-center">
            Buscando los mejores perfiles profesionales que se adecuen a ti...
          </p>
        </article>
      ) : (
        // Contenido principal una vez que la carga haya terminado
        <article className="flex flex-col items-center">
          <Header />
          <main className="flex flex-col items-center gap-12">
            <h1 className="text-[#4A4A4A] w-[276px] text-center text-wrap text-base leading-tight mt-12">
              Te recomendamos estos especialistas basados en tus necesidades
            </h1>
            <SelectedCardList selected={selected} />
            <CustomButton
              title="Buscar más profesionales"
              type="button"
              appearance={true}
            />
          </main>
        </article>
      )}
    </>
  );
}

export default SelectedProfessional;
