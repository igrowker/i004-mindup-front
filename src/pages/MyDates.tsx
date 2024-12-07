import { useState } from "react";
import Header from "../components/header/Header";
import SelectDay from "../components/mydates/SelectDay";
import ConfirmTurn from "../components/mydates/ConfirmTurn";

function MyDates() {
  const [fase, setFase] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();



  const handleChipClick = (time: string) => {
    setSelectedTime(time); // Guarda el horario seleccionado
    setFase(2); // Cambia la fase
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date); // Guarda el día seleccionado
  };

  return (
    <section className="w-full">
      <Header />
      {fase === 1 && (
        <SelectDay
          onChipClick={handleChipClick}
          onDateSelect={handleDateSelect}
        />
      )}
      {fase === 2 && (
        <ConfirmTurn
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setFase={() => setFase(1)}
        />
      )}
    </section>
  );
}

export default MyDates;
