import { BiSolidCheckCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface ProfileData {
  imagen: string;
  nombre: string;
  especialidad: string;
}

const ProfileHeader = ({ imagen, nombre, especialidad }: ProfileData) => {
  return (
    <article className="w-[343px] bg-background pb-2 my-2 py-2 flex flex-col gap-4 items-center rounded-2xl">
      <div className="relative">
        <div className="rounded-full mt-2 h-[104px] w-[104px] bg-zinc-500"></div>
        <div className="absolute top-[1px] -left-[6px] w-[118px] h-[118px] rounded-full border-[5px] border-transparent border-t-secondary border-l-secondary transform -rotate-45 flex items-center justify-center">
          {imagen ? (
            <img
              className="rotate-45 rounded-full"
              src={imagen}
              alt="Imagen de perfil"
            />
          ) : (
            <FaUser className=" bg-[#989898] rotate-45 size-full fill-zinc-600 rounded-full" />
          )}
        </div>
        <button className="absolute top-3 -right-2 size-[26px] rounded-full bg-background border-2 border-secondary flex items-center justify-center">
          <MdEdit className="text-secondary" />
        </button>
        <span className="absolute -bottom-6 -left-7 bg-gradient-to-r from-secondary font-medium to-[#82BFAF] text-white w-40 h-6 text-center text-md rounded-full">
          50% COMPLETADO
        </span>
      </div>
      <div className="text-center w-full flex justify-center items-center relative mt-4">
        <div className="leading-none">
          <h1 className="font-medium text-xl">{nombre}</h1>
          <h3>{especialidad}</h3>
        </div>
        <BiSolidCheckCircle className="size-4 absolute right-16 top-2" />
      </div>
    </article>
  );
};

export default ProfileHeader;
