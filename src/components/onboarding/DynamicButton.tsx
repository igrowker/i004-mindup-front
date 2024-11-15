interface DynamicButtonProps {
  buttonText: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  buttonText,
  onClick,
  bgColor,
  textColor,
}) => {
  return (
    <button
      className={`w-72 py-2 px-6 mt-8 rounded-md text-lg ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default DynamicButton;
