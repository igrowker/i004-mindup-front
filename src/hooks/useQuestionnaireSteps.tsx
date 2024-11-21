import { useState } from 'react';
import { ViewData } from '../pages/Questionnaire';
// interface ViewData {
//   allowMultiple?: boolean;
//   options?: string[];
//   logoSize?: number;
//   type: string;
// }
// hook para controlar el flujo entre los pasos del cuestionario e ir almacenando las respuestas del user
const useQuestionnaireSteps = (viewsData: ViewData[]) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string | string[]>>(
    {}
  );
  //el estado responses permite almacenar una unica opcion seleccionada por el user, como tambien multiples opciones seleccionadas.
  //Ejemplo: 0:"Respuesta seleccioanda", 1: "Otra", 2: ["Multiples", "respuestas", "seleccionadas"]

  // PRIMER PRUEBA DE FUNCION
  //   const handleOptionSelect = (option: string) => {
  //     const allowMultiple = steps[currentStep]?.allowMultiple;
  //     setResponses((prev) => {
  //       const currentResponses = prev[currentStep] || [];
  //       if (allowMultiple) {
  //         if (Array.isArray(currentResponses)) {
  //           const updatedResponses = currentResponses.includes(option)
  //             ? currentResponses.filter((item) => item !== option)
  //             : [...currentResponses, option];
  //           return { ...prev, [currentStep]: updatedResponses };
  //         }
  //         return { ...prev, [currentStep]: [option] };
  //       }
  //       return { ...prev, [currentStep]: option };
  //     });
  //   };

  // SEGUNDA PRUEBA DE FUNCION
  const handleOptionSelect = (option: string) => {
    const currentView = viewsData[currentStep];
    const allowMultiple = currentView?.allowMultiple;

    setResponses((prev) => {
      const currentResponses = prev[currentStep] || (allowMultiple ? [] : '');

      // SI SE PERMITEN MULTIPLES OPCIONES:
      if (allowMultiple) {
        if (Array.isArray(currentResponses)) {
          const updatedResponses = currentResponses.includes(option)
            ? currentResponses.filter((item) => item !== option)
            : [...currentResponses, option];
          return { ...prev, [currentStep]: updatedResponses };
        }
      }
      // SI NO, GUARDO UNA SOLA Y A LA MIERD444
      return { ...prev, [currentStep]: option };
    });
  };

  const handleNext = () => {
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
