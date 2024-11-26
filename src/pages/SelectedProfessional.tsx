import { useState, useEffect } from "react";
import Loading from "../components/shared/Loading";
import Slider from "../components/selected/SliderCard";

function SelectedProfessional() {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga


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
        <Loading />
      ) : (
        <Slider />
      )}
    </>
  );
}

export default SelectedProfessional;
