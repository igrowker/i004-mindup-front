import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type PatientCardProps = {
  image: string;
  time: string;
  patient?: string;
  consultationType?: string;
  options?: string;
  btnPendiente: boolean;
  id: string;
};

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  image,
  time,
  patient = "",
  options,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border border-zinc-200 rounded-md h-full py-2 px-4 w-[343px] flex flex-col  items-start gap-2">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/profile/${id}`)}
            className="h-full flex justify-center items-center"
          >
            {image ? (
              <img
                className="w-12 h-12 rounded-full"
                src={image}
                alt="Icono de horario bloqueado"
              />
            ) : (
              <FaUser className="size-12 bg-[#989898] fill-zinc-600 rounded-full" />
            )}
          </button>
          <div className="h-full flex flex-col justify-center">
            <h3 className="text-text text-sm font-bold">{patient}</h3>
            <p className="text-[12px] text-[#444444]">{time}</p>
            <p className="text-[12px] text-[#969696]">{options}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCard;
