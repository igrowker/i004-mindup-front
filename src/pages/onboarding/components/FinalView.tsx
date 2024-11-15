import { useNavigate } from 'react-router-dom';
import InputText from '../../../components/shared/Inputs/InputText';
import DynamicButton from './DynamicButton';

const FinalView: React.FC = () => {
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background py-12 px-6">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Cuentanos sobre ti <br /> para Empezar a Ayudar
      </h2>
      {/* FORMULARIO DEL PSICOLOGO  */}
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md mb-4">
          <InputText name="Nombre*" placeholder="Trinidad" />
        </div>
        <div className="w-full max-w-md mb-4">
          <InputText name="Apellido*" placeholder="García" />
        </div>
        <div className="w-full max-w-md mb-4">
          <InputText name="Especialidad*" placeholder="Clínica" />
        </div>
        <div className="w-full max-w-md mb-4">
          <InputText name="Matrícula*" placeholder="3265" />
        </div>
        <div className="w-full max-w-md mb-4">
          <InputText name="Zona de atención*" placeholder="Coloca tu CP" />
        </div>

        <div className="w-full max-w-md mb-4">
          <label className=" font-bold my-1 block mb-1">
            Tipo de atención*
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-2 border border-gray-300 rounded-sm">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-700">Virtual</label>
            </div>
            <div className="flex items-center px-3 py-2 border border-gray-300 rounded-sm">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-700">Presencial</label>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mb-2">
          <label
            htmlFor="descripcion"
            className="text-sm font-semibold text-gray-800 block mb-1"
          >
            Cuéntanos un poco sobre ti, ¿qué te motiva como profesional?
          </label>
          <textarea
            id="descripcion"
            placeholder="Cuéntanos tus motivaciones y valores."
            maxLength={100}
            className="w-full h-18 p-3 border border-gray-300 rounded-sm resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            0/100 caracteres
          </p>
        </div>
        <div className="w-full flex justify-center">
          <DynamicButton
            buttonText="Guardar"
            onClick={() => navigate('/home')} // aca iria la fn para enviar los datos al back
            bgColor="bg-violet-500"
            textColor="text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default FinalView;
