import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import PatientCardList from "../components/mypatients/PatientCardList";
import AppointmentCardList from "../components/mypatients/AppointmentCardList";
import { useUserStore } from "../context/userStore";
import { useEffect, useState } from "react";
import { getPatients } from "../api/userPatients";

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUserStore();

  const navigate = useNavigate();

  if (user?.role != "PSYCHOLOGIST") {
    navigate("/");
    return;
  }

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await getPatients(user.id);
        setPatients(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <section className="flex flex-col items-center pb-2">
      <Header />
      <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
        <h2 className="font-medium text-gray-800 text-lg">Mis pacientes</h2>
      </article>
      <article className="flex flex-col my-4 justify-center items-center gap-2 w-[343px]">
        {loading ? (
          <p>Cargando...</p>
        ) : patients.length === 0 ? (
          <div>No tienes pacientes aun.</div>
        ) : (
          <PatientCardList appointments={patients} />
        )}
      </article>
      <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
        <h2 className="font-medium text-gray-800 text-lg">Solicitudes</h2>
      </article>
      <article className="flex flex-col my-4 justify-center items-center gap-2 w-[343px]">
        <AppointmentCardList appointments={patients} />
      </article>
    </section>
  );
};

export default MyPatients;
