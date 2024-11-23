import Header from "../components/header/Header";
import CustomButton from "../components/shared/CustomButton";

function MyDates() {
  return (
    <section className="w-full">
      <Header />
      <article className="flex flex-col w-full p-4">
        <h1 className="text-[#A1A1A1] m-4">Tu profesional elegido es:</h1>
        <div className="w-[342px] shadow rounded-lg border flex p-2 px-4 items-center border-[#E5E7EB] gap-4">
          <img
            src="public/Imágenes/miguel.png"
            alt="Foto del profesional"
            className="size-10 bg-[#989898] rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-bold">Lic. Kevin Jefe</h2>
            <h3 className="text-[#4A4A4A]">Terapia Cognitiva</h3>
          </div>
        </div>
        <CustomButton title="Agendar una cita"/>
      </article>
    </section>
  );
}

export default MyDates;
