import { useState, useEffect } from "react";
import Loading from "../components/shared/Loading";
import Slider from "../components/selected/SliderCard";
import { selectStore } from "../context/userStore";
import { userSelect } from "../api/userSelect";
import { useNavigate } from "react-router-dom";

function SelectedProfessional() {
  const [isLoading, setIsLoading] = useState(true); 
  const [userData, setUserData] = useState([]); // Nuevo estado para usuarios
  const { select } = selectStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getMatchs = async () => {
      try {
        setIsLoading(true);

        if (select?.gender && typeof select?.isBelow35 !== "undefined") {
          const transformedSelect = {
            isBelow35: select.isBelow35,
            gender: select.gender === "MALE" || select.gender === "FEMALE" ? select.gender : "OTHER",
          };
          const response = await userSelect(transformedSelect);
          setUserData(response); // Guardar usuarios
        } else {
          navigate("/questionnaire");
        }
      } catch (error) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    getMatchs();
  }, [select, navigate]);

  return (
    <>
      {isLoading ? <Loading /> : <Slider userData={userData} />}
    </>
  );
}

export default SelectedProfessional;
