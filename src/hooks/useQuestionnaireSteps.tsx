import { useState } from 'react';
import { ViewData } from '../pages/Questionnaire';
import { useNavigate } from 'react-router-dom';

// este hook gestiona el estado de las options seleccioadas por el user y las actualiza segun si la pregunta permite seleccionar múltiples opciones o no.
const useQuestionnaireSteps = (viewsData: ViewData[]) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string | string[]>>(
    {}
  );
  const handleOptionSelect = (option: string) => {
    const currentView = viewsData[currentStep];
    const allowMultiple = currentView?.allowMultiple;

    setResponses((prev) => {
      const currentResponses = prev[currentStep] || (allowMultiple ? [] : '');

      if (allowMultiple) {
        if (Array.isArray(currentResponses)) {
          const updatedResponses = currentResponses.includes(option)
            ? currentResponses.filter((item) => item !== option)
            : [...currentResponses, option];
          return { ...prev, [currentStep]: updatedResponses };
        }
      }
      return { ...prev, [currentStep]: option };
    });
  };

  const handleNext = () => {
    if (currentStep === 7) {
      navigate('/selected');
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentStep,
    responses,
    handleNext,
    handlePrevious,
    handleOptionSelect,
  };
};

export default useQuestionnaireSteps;
