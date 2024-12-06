import MonthCalendar from "../components/home/MonthCalendar";
import { useEffect, useState } from "react";
import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import Header from "../components/header/Header";
import ConfirmDateCardList from "../components/home/ConfirmDateCardList";
import CustomButton from "../components/shared/CustomButton";
import { getAppointmentByDate } from "../api/userDates";
import { useUserStore } from "../context/userStore";

type Appointment = {
  date: string;
  id: string;
  patientName: string;
  status: string;
};

const confirmAppointments = [
  //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA PARA CONFIRMAR
  {
    day: "Lunes",
    timeRange: "8 hs - 9 hs",
    patient: "Lucio Crack",
  },
  {
    day: "Martes",
    timeRange: "10 hs - 11 hs",
    patient: "Ludgwing Tipazo",
  },
  {
    day: "Miércoles",
    timeRange: "14 hs - 15 hs",
    patient: "Kevin Master",
  },
];
function AppointmentManage() {
  const [typeCalendar, setTypeCalendar] = useState("month");
  const [selectedDate, setSelectedDate] = useState<Appointment[]>([]);
  const { user } = useUserStore();

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      handleDateSelect(new Date());
    }
  }, []);

  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    setSelectedDate([]);
    // Convierte la fecha al formato "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    const response = await getAppointmentByDate(formattedDate, user.id);
    setSelectedDate(response);
  };

  return (
    <section className="flex flex-col items-center pb-2 gap-4">
      <Header />
      <article>
        <div className="flex justify-center gap-2 mt-10 mx-2 mb-8">
          <button
            onClick={() => setTypeCalendar("week")}
            className={`border-b w-32 ${
              typeCalendar == "week"
                ? "text-secondary border-secondary"
                : "text-[#767676] border-[#767676]"
            }`}
          >
            Vista Semanal
          </button>
          <button
            onClick={() => setTypeCalendar("month")}
            className={`border-b w-32 ${
              typeCalendar == "month"
                ? "text-secondary border-secondary"
                : "text-[#767676] border-[#767676]"
            }`}
          >
            Vista Mensual
          </button>
        </div>
        {typeCalendar == "month" ? (
          <MonthCalendar onDateSelect={handleDateSelect} />
        ) : (
          <WeekCalendar onDateSelect={handleDateSelect} />
        )}
      </article>
      <article className="w-full p-4 flex flex-col items-center gap-4">
        <h1 className="font-medium text-gray-800 text-lg">Próximos turnos</h1>
        <DateCardList appointments={selectedDate} />
        <h2 className="font-medium text-gray-800 text-lg">
          Turnos pendientes de confirmación
        </h2>
        <ConfirmDateCardList appointments={confirmAppointments} />
      </article>
      <CustomButton title="Agregar horario" appearance={true} />
    </section>
  );
}

export default AppointmentManage;
