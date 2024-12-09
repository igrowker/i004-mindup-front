import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import ProgressBar from "./ProcessBar";
import TextSection from "./TextSection";
import DynamicButton from "../onboarding/DynamicButton";
import OptionButton from "./OptionButton";
import { ViewData } from "../../pages/Questionnaire";
import { selectStore } from "../../context/userStore";

type QuestionnaireStageProps = {
  currentStepData: ViewData;
  currentStep: number;
  viewsDataSize: number;
  responses: Record<number, string | string[]>;
  handleOptionSelect: (option: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

const QuestionnaireStage: React.FC<QuestionnaireStageProps> = ({
  currentStepData,
  currentStep,
  viewsDataSize,
  responses,
  handleOptionSelect,
  handleNext,
  handlePrevious,
}) => {
  const { setSelect } = selectStore();

  const handleSelect = (option: string) => {
    handleOptionSelect(option);

    if (currentStep === 5) {
      // Vista para género
      const gender = option === "Sea un varón" ? "MALE" : "FEMALE";
      setSelect({ gender });
    } else if (currentStep === 6) {
      // Vista para edad
      const isBelow35 = option === "Tenga menos de 35 años" ? true : false;
      setSelect({ isBelow35 });
    }
  };

  const bgColor =
    currentStep === 0 || currentStep === 1
      ? "bg-background"
      : "bg-secondaryBtn";
  const textColor =
    currentStep === 0 || currentStep === 1
      ? "text-secondary"
      : "text-background";

  const isNextDisabled = currentStepData.options
    ? !(responses[currentStep]?.length > 0)
    : false;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center text-background ">
      <div className="mt-20 w-full flex flex-col items-center justify-center">
        <Logo logoSize={currentStepData.logoSize} />
        <ProgressBar currentStep={currentStep} viewsDataSize={viewsDataSize} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-4/5 flex flex-col items-center"
        >
          <TextSection currentStepData={currentStepData} />

          {currentStepData.options?.map((option) => {
            // Determina el ícono según la opción
            const icon = option.includes("Mañana")
              ? "dia.gif"
              : option.includes("Mediodía")
              ? "tarde.gif"
              : option.includes("Tarde")
              ? "noche.gif"
              : undefined;

            return (
              <OptionButton
                key={option}
                option={option}
                isSelected={
                  Array.isArray(responses[currentStep])
                    ? responses[currentStep].includes(option) // Para opciones múltiples
                    : responses[currentStep] === option
                } // Para una sola opción
                onSelect={handleSelect}
                icon={icon}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="relative w-4/5 flex flex-col items-center mb-32 ">
        <div className="flex flex-col w-full">
          <DynamicButton
            bgColor={bgColor}
            textColor={textColor}
            buttonText="Continuar"
            onClick={handleNext}
            disabled={isNextDisabled}
          />
        </div>
        {currentStep > 2 && (
          <div className="absolute top-full w-full mt-4">
            <DynamicButton
              bgColor="transparent"
              textColor="white"
              onClick={handlePrevious}
              buttonText="Anterior"
              border="border border-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireStage;
