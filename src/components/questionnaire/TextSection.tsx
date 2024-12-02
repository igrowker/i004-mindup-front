import React from 'react';

interface CurrentStepData {
  optionalText?: string;
  question: string;
  type?: 'intro' | string; // Puedes ajustar los valores posibles de `type` si es necesario.
  answer?: string;
}

interface TextSectionProps {
  currentStepData: CurrentStepData;
}

const TextSection: React.FC<TextSectionProps> = ({ currentStepData }) => {
  return (
    <div className="flex w-80 flex-col items-center space-y-4">
      {currentStepData.optionalText && (
        <h2 className="text-xl text-center mb-4">{currentStepData.optionalText}</h2>
      )}
      <h1 className="w-52 text-xl text-center">{currentStepData.question}</h1>
      {/* ANSWERS */}
      {currentStepData.type === 'intro' && (
        <div className="w-60 flex flex-col items-center">
          <p className="text-center text-xl">{currentStepData.answer}</p>
        </div>
      )}
    </div>
  );
};

export default TextSection;
