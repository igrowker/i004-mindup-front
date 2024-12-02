import MonthCalendar from "../components/home/MonthCalendar";
import { useState } from "react";
import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import Header from "../components/header/Header";
import ConfirmDateCardList from "../components/home/ConfirmDateCardList";
import CustomButton from "../components/shared/CustomButton";

const appointments = [
  //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA PARA TURNOS CONFIRMADOS
  {
    day: "Lunes",
    timeRange: "8 hs - 9 hs",
  },
  {
    day: "Martes",
    timeRange: "10 hs - 11 hs",
    patient: "Carlos Ruiz",
    consultationType: "Consulta General",
    blocked: true,
  },
  {
    day: "Miércoles",
    timeRange: "14 hs - 15 hs",
  },
];


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
    patient: "Ludgwing Tipazo"
  },
  {
    day: "Miércoles",
    timeRange: "14 hs - 15 hs",
    patient: "Kevin Master"
  },
];
function AppointmentManage() {
  const [typeCalendar, setTypeCalendar] = useState("month");
  const handleDateSelect = (date: Date | null) => {
    console.log("Día seleccionado:", date);
    // Aquí puedes manejar el día seleccionado para agendar horarios
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
        {typeCalendar == "month" ? <MonthCalendar onDateSelect={handleDateSelect}  /> : <WeekCalendar onDateSelect={handleDateSelect} />}
      </article>
      <article className="w-full p-4 flex flex-col items-center gap-4">
        <h1 className="font-medium text-gray-800 text-lg">
          Próximos turnos
        </h1>
        <DateCardList appointments={appointments} />
        <h2 className="font-medium text-gray-800 text-lg">
          Turnos pendientes de confirmación
        </h2>
        <ConfirmDateCardList appointments={confirmAppointments}/>
      </article>
      <CustomButton title="Agregar horario" appearance={true}/>
    </section>
  );
}

export default AppointmentManage;
