import DynamicButton from '../onboarding/DynamicButton';

const OptionButton = ({ option, isSelected, onSelect }) => {
  const bgColor = isSelected ? 'bg-slate-500' : 'bg-background';
  const textColor = isSelected ? 'text-black' : 'text-secondary';

  return (
    <DynamicButton
      bgColor={bgColor}
      textColor={textColor}
      onClick={() => onSelect(option)}
      buttonText={option}
      className="mt-2 mb-2 w-80"
    />
  );
};

export default OptionButton;
