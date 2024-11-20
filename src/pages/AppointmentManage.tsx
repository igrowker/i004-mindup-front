import { GoArrowLeft } from "react-icons/go";
import MonthCalendar from "../components/home/MonthCalendar";
import { useState } from "react";
import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";

const appointments = [
  //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA
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

function AppointmentManage() {
  const [typeCalendar, setTypeCalendar] = useState("month");

  return (
    <section className="flex flex-col items-center pb-2">
      <Header />
      <article className="mb-8">
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
        {typeCalendar == "month" ? <MonthCalendar /> : <WeekCalendar />}
      </article>
      <article>
          <DateCardList appointments={appointments} />
      </article>
    </section>
  );
}

export default AppointmentManage;
