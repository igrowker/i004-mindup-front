import { useState, useEffect } from "react";
import Loading from "../components/shared/Loading";
import Slider from "../components/selected/SliderCard";
import { selectStore } from "../context/userStore";
import { userSelect } from "../api/userSelect";
import { useNavigate } from "react-router-dom";

interface SelectData {
  isBelow35: boolean;
  gender: string; // Asegúrate de que el string sea "MALE" o "FEMALE" según tu necesidad
}

function SelectedProfessional() {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const { select } = selectStore();
  const navigate = useNavigate()

  useEffect(() => {
    const getMatchs = async () => {
      try {
        setIsLoading(true);

        // Verifica si los valores de 'select' están definidos
        if (select?.gender && typeof select?.isBelow35 !== "undefined") {
          const transformedSelect: SelectData = {
            isBelow35: select.isBelow35, // 'isBelow35' es un booleano
            gender:
              select.gender === "MALE" || select.gender === "FEMALE"
                ? select.gender
                : "OTHER", // Aseguramos que gender sea 'MALE' o 'FEMALE'
          };
          console.log(transformedSelect);
          const response = await userSelect(transformedSelect);
          console.log(response);
        } else {
          navigate('/questionnaire')
        }
      } catch (error) {
        navigate('/')
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    getMatchs();
  }, [select]);

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
