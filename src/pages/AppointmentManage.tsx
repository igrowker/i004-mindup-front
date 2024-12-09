import MonthCalendar from "../components/home/MonthCalendar";
import { useEffect, useState } from "react";
import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import Header from "../components/header/Header";
import ConfirmDateCardList from "../components/home/ConfirmDateCardList";
import {
  getAppointmentByDate,
  getPendientAppointments,
} from "../api/userDates";
import { useUserStore } from "../context/userStore";

type DateAppointment = {
  date: string;
  id: string;
  patientName: string;
  status: string;
};

type Appointment = {
  id: string;
  date: string;
  patient: {
    name: string;
  };
};

function AppointmentManage() {
  const [typeCalendar, setTypeCalendar] = useState("month");
  const [selectedDate, setSelectedDate] = useState<DateAppointment[]>([]);
  const [pendientDates, setPendientDates] = useState<Appointment[]>([]);
  const { user } = useUserStore();

  if (!user) {
    return null;
  }

  useEffect(() => {
    handleDateSelect(new Date());
    handlePendientDates();
  }, []);

  const handlePendientDates = async () => {
    const response = await getPendientAppointments(user.id);
    setPendientDates(response);
  };

  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    setSelectedDate([]);
    // Convierte la fecha al formato "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    const response = await getAppointmentByDate(formattedDate, user.id);
    setSelectedDate(response);
  };

  const removePendientDate = (id: string) => {
    setPendientDates((prev) => prev.filter((appointment) => appointment.id !== id));
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
        {selectedDate.length > 0 ? (
          <DateCardList appointments={selectedDate} onRefresh={handleDateSelect} />
        ) : (
          <h3>No hay turnos para esta fecha</h3>
        )}

        <h2 className="font-medium text-gray-800 text-lg">
          Turnos pendientes de confirmación
        </h2>
        {pendientDates.length > 0 ? (
          <ConfirmDateCardList appointments={pendientDates} onRemove={removePendientDate}  />
        ) : (
          <h3>No hay turnos pendientes de confirmación</h3>
        )}
        
      </article>
    </section>
  );
}

export default AppointmentManage;
