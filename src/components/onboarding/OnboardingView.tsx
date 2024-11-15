import DynamicButton from './DynamicButton';

interface OnboardingViewProps {
  backgroundImage: string;
  logo: string;
  texts: string[];
  buttonText: string;
  onButtonClick: () => void;
  step: number;
}

// Responsabilidad del componente: Mostrar la informacion de cada vista del proceso de onboarding
const OnboardingView: React.FC<OnboardingViewProps> = ({
  backgroundImage,
  logo,
  texts,
  buttonText,
  onButtonClick,
  step,
}) => {
  const bgColor = step === 1 || step === 5 ? 'bg-violet-500' : 'bg-white';
  const textColor = step === 1 || step === 5 ? 'text-white' : 'text-violet-500';
  const paragraphColor = step === 1 ? 'text-black' : 'text-white';

  return (
    <div
      className="min-h-screen w-full min-w-mobile flex flex-col justify-between items-center bg-slate-800"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* LOGO + PARRAGRAPH SECTION */}
      <div className="flex flex-col items-center w-full">
        {/* LOGO SECTION */}
        <div className="flex justify-center w-full mt-28 mb-8">
          <img src={logo} alt="logo" />
        </div>

        {/* PARAGRAPH SECTION */}
        <div
          className={`flex flex-col items-center text-center px-10 ${
            step === 1 ? 'mt-0' : 'mt-28'
          }`}
          style={{ height: '200px' }}
        >
          <p
            className={`${paragraphColor} ${
              step === 1
                ? 'font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl'
                : 'text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-8'
            }`}
          >
            {texts[0]}
          </p>
          <p
            className={`${paragraphColor} ${
              step === 1
                ? 'font-semibold text-xl sm:text-4xl md:text-5xl lg:text-6xl mt-4'
                : ' font-thin text-lg sm:text-5xl md:text-6xl lg:text-7xl mt-8 tracking-wider'
            }`}
          >
            {texts[1]}
          </p>
        </div>
      </div>

      {/* BUTTON SECTION */}
      <div className="w-full flex justify-center mb-32">
        <DynamicButton
          buttonText={buttonText}
          onClick={onButtonClick}
          bgColor={bgColor}
          textColor={textColor}
        />
      </div>
    </div>
  );
};

export default OnboardingView;
