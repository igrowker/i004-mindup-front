import React from 'react';
import DynamicButton from '../onboarding/DynamicButton';

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  onSelect: (option: string) => void;
  icon?: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onSelect,
  icon,
}) => {
  const bgColor = isSelected ? "bg-[#A3A3A3]" : "bg-background";
  const textColor = isSelected ? "text-[#52359A]" : "text-secondary";

  return (
    <DynamicButton
      bgColor={bgColor}
      textColor={textColor}
      onClick={() => onSelect(option)}
      buttonText={option}
      className="mt-2 mb-2"
      icon={icon}
      isSelected={isSelected} // Pasa isSelected aquí
    />
  );
};


export default OptionButton;
