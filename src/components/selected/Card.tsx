const Card = () => {
  return (
    <div className="bg-background shadow-md rounded-lg p-4 w-full max-w-[21rem] sm:max-w-sm flex flex-col justify-between h-auto">
      <header className="flex items-center mb-2 border-b-2 border-secondary pb-2">
        <div className="flex-shrink-0 ml-4">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src="/public/Imágenes/trinidadProfesional.png"
            alt="Trinidad García"
          />
        </div>
        <div className="ml-6">
          <h3 className="text-base font-bold text-black inline-flex items-center">
            Lic. Trinidad García
            <span className="ml-2">
              <img
                className="w-4 h-4"
                src="/public/Íconos/Vector.png"
                alt="Ícono de verificación"
              />
            </span>
          </h3>
          <h4 className="text-xs font-medium text-black">
            Terapia Cognitivo - Conductual
          </h4>
        </div>
      </header>

      <main className="flex flex-col gap-2">
        <div className="flex justify-between ">
          <p className="text-xs font-bold">Tipo de atención</p>
          <p className="text-xs font-medium">Virtual y presencial</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xs font-bold">Honorarios por sesión</p>
          <p className="text-xs font-medium">$13.000 a $15.000</p>
        </div>

        <div>
          <h5 className="text-xs font-bold mb-2">Sobre Trinidad</h5>
          <div className="relative w-full flex justify-center">
            {/* Imagen centrada */}
            <img
              className="w-full max-w-xs "
              src="/public/Imágenes/TrinidadVideo.png"
              alt="Trinidad video presentacional"
            />

            <img
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14"
              src="/public/Íconos/PlayIcon.png"
              alt="Play Icon"
            />
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold">Frase de Trinidad</h5>
          <p className="text-center text-xs inline-flex">
            <img
              src="/public/Íconos/Tipo de atencion check.svg
            "
              alt=""
            />
            "Somos seres con la capacidad de desear pero siempre incompletos, de
            ahí surge nuestro caminar" <br /> - Jacques Lacan
          </p>
        </div>

        <div className="flex justify-between">
          <h5 className="text-xs font-bold">Su canción</h5>
          <p className="text-xs font-medium">The beatles - All my loving</p>
        </div>
      </main>
      <button className="mt-4 bg-secondary text-background py-3 px-6 rounded-lg font-semibold  ">
        Agendar turno
      </button>
    </div>
  );
};

export default Card;
