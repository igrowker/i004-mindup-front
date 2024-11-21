import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import ProgressBar from './ProcessBar';
import TextSection from './TextSection';
import DynamicButton from '../onboarding/DynamicButton';
import OptionButton from './OptionButton';
import { useState } from 'react';
import { ViewData } from '../../pages/Questionnaire';

// interface StepData {
//   type: string;
//   options?: string[];
//   allowMultiple?: boolean;
//   logoSize?: number;
// }

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
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option: never) => {
    if (currentStepData.allowMultiple) {
      handleOptionSelect(option);
    } else {
      setSelectedOption(option);
      handleOptionSelect(option);
    }
  };
  const bgColor =
    currentStep === 0 || currentStep === 1
      ? 'bg-background'
      : 'bg-secondaryBtn';
  const textColor =
    currentStep === 0 || currentStep === 1
      ? 'text-secondary'
      : 'text-background';

  const isNextDisabled = currentStepData.options
    ? !(responses[currentStep]?.length > 0)
    : false;

  return (
    <div className="min-h-screen flex flex-col justify-between items-center text-background ">
      <div className="mt-20 w-96 flex flex-col items-center justify-center">
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
          className="w-96 flex flex-col items-center"
        >
          <TextSection currentStepData={currentStepData} />

          {currentStepData.type === 'question' && (
            <div>
              {currentStepData.options?.map((option) => (
                <OptionButton
                  key={option}
                  option={option}
                  isSelected={selectedOption === option}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative w-full flex flex-col items-center mb-32 ">
        <div className="flex flex-col w-80">
          <DynamicButton
            bgColor={bgColor}
            textColor={textColor}
            buttonText="Continuar"
            onClick={handleNext}
            disabled={isNextDisabled}
          />
        </div>
        {currentStep > 2 && (
          <div className="absolute top-full w-80 mt-4">
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
