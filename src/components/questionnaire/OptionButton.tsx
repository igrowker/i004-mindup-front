import React from 'react';
import DynamicButton from '../onboarding/DynamicButton';

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, isSelected, onSelect }) => {
  const bgColor = isSelected ? 'bg-[#A3A3A3]' : 'bg-background';
  const textColor = isSelected ? 'text-[#52359A]' : 'text-secondary';

  return (
    <DynamicButton
      bgColor={bgColor}
      textColor={textColor}
      onClick={() => onSelect(option)}
      buttonText={option}
      className="mt-2 mb-2"
    />
  );
};

export default OptionButton;
