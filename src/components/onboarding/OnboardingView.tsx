import DynamicButton from './DynamicButton';

interface OnboardingViewProps {
  backgroundImage: string;
  logo: string;
  texts: string[];
  buttonText: string;
  onButtonClick: () => void;
  step: number;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({
  backgroundImage,
  logo,
  texts,
  buttonText,
  onButtonClick,
  step,
}) => {
  const bgColor = step === 1 || step === 5 ? 'bg-secondary' : 'bg-background';
  const textColor =
    step === 1 || step === 5 ? 'text-background' : 'text-secondary';
  const paragraphColor = step === 1 ? 'text-black' : 'text-background';

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center relative">
      {step === 1 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}

      {step !== 1 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Logo */}
        <div className="flex justify-center w-full mt-20 sm:mt-28">
          <img src={logo} alt="logo" className="w-40 sm:w-40 lg:w-48" />
        </div>

        {/* Textos */}
        <div
          className={`flex flex-col items-center text-center px-6 sm:px-10 ${
            step === 1 ? 'mt-18 ' : 'mt-24 sm:mt-28'
          }`}
          style={{ height: '200px' }}
        >
          <p
            className={`${paragraphColor} ${
              step === 1
                ? 'font-semibold text-2xl sm:text-3xl lg:text-4xl'
                : 'font-bold text-2xl sm:text-3xl lg:text-4xl mb-4'
            } max-w-xs sm:max-w-md`}
          >
            {texts[0]}
          </p>
          <p
            className={`${paragraphColor} ${
              step === 1
                ? 'font-semibold text-lg sm:text-xl lg:text-2xl mt-1'
                : 'text-lg sm:text-lg lg:text-xl mt-4 tracking-wide'
            } max-w-xs sm:max-w-md`}
          >
            {texts[1]}
          </p>
        </div>
      </div>

      {/* Botón */}
      <div className="relative z-10 w-4/5 flex justify-center mb-20 sm:mb-32">
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
