import { GoArrowLeft } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { BiSolidCheckCircle } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";

function Profile() {
  return (
    <div className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <header className="bg-secondary w-full pl-2 py-5 text-white flex items-center">
        <button className="p-1">
          <GoArrowLeft />
        </button>
        <span>Perfil</span>
      </header>
      <article className="w-[343px] bg-background pb-2 my-2 py-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col gap-4 items-center rounded-2xl">
        <div className="relative">
          <div className="rounded-full mt-2 h-[104px] w-[104px] bg-zinc-500"></div>
          <div className="absolute top-[1px] -left-[6px] w-[118px] h-[118px] rounded-full border-[5px] border-transparent border-t-secondary border-l-secondary transform -rotate-45 flex items-center justify-center"></div>
          <div className="absolute top-3 -right-2 size-[26px] rounded-full bg-background border-2 border-secondary flex items-center justify-center">
            <MdEdit className="text-secondary" />
          </div>
          <span className="absolute -bottom-2 -left-7 bg-gradient-to-r from-secondary font-medium to-[#82BFAF] text-white w-40 h-6 text-center text-md rounded-full">
            50% COMPLETADO
          </span>
        </div>
        <div className="text-center w-full flex justify-center items-center relative">
          <div className="leading-none">
            <h1 className="font-medium text-xl">Lic.Trinidad García</h1>
            <h3>Cognitivo - Conductual</h3>
          </div>
          <BiSolidCheckCircle className="size-8 ml-2 absolute right-12 top-2" />
        </div>
      </article>
      <article className="w-[343px]  bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <div>
          <h2 className="font-medium">Especialidad</h2>
          <p>Terapia Cognitivo - conductual</p>
        </div>
        <div className="flex gap-4">
          <div>
            <h2 className="font-medium">Estudios</h2>
            <p>Universidad de cuyo</p>
          </div>
          <div>
            <h2 className="font-medium">Matrícula</h2>
            <p>3265</p>
          </div>
        </div>
      </article>
      <div className="w-[343px] text-start px-6">
        <h2 className="font-medium text-base">Frase que me identifica</h2>
      </div>
      <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <p className="font-medium italic">
          “Somos seres con la capacidad de desear pero siempre incompletos, de
          ahí surge nuestro caminar”
        </p>
        <p className="self-end">-Jacques Lacan</p>
      </article>
      <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <h2 className="font-medium">Sobre mi</h2>
        <p className="text-[#969696]">
          Es tu oportunidad para llamar la atención de tus pacientes, tu
          historia, experiencia e intereses.
        </p>
      </article>
      <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <h2 className="font-medium">Más sobre mi</h2>
        <div className="flex flex-col">
            <div className="flex justify-between">
                <h3>Idiomas</h3>
                <div className="flex items-center text-[#969696]">Vacío <IoIosArrowForward/></div>
            </div>
            <div className="flex justify-between">
                <h3>Animales</h3>
                <div className="flex items-center text-[#969696]">Vacío <IoIosArrowForward/></div>
            </div>
            <div className="flex justify-between">
                <h3>Alimentación</h3>
                <div className="flex items-center text-[#969696]">Vacío <IoIosArrowForward/></div>
            </div>
            <div className="flex justify-between">
                <h3>Zodíaco</h3>
                <div className="flex items-center text-[#969696]">Vacío <IoIosArrowForward/></div>
            </div>
            <div className="flex justify-between">
                <h3>Pronombre</h3>
                <div className="flex items-center text-[#969696]">Vacío <IoIosArrowForward/></div>
            </div>
        </div>
      </article>
      <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <h2 className="font-medium">Tu canción</h2>
        <p>The Beatles - All my loving</p>
      </article>
      <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)] flex flex-col text-base rounded-2xl leading-tight">
        <p>Graba un breve video de presentación (máximo 1 minuto) para que los pacientes puedan conocerte mejor.</p>
        <div className="w-[305px] flex flex-col items-center border border-dashed border-secondary p-4">
            < FiPlusCircle className="text-secondary size-[22px]"/>
            <p className="font-medium text-[#969696]">Subir o grabar un video</p>
        </div>
      </article>
    </div>
  );
}

export default Profile;
