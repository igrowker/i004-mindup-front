const ProgressBar = ({ currentStep, viewsDataSize }) => {
  return (
    currentStep >= 2 && (
      <div className="w-60 mt-4">
        <div className="bg-background h-2 rounded">
          <div
            className="bg-secondary h-2 rounded"
            style={{
              width: `${((currentStep + 1) / viewsDataSize) * 100}%`,
            }}
          />
        </div>
      </div>
    )
  );
};

export default ProgressBar;
