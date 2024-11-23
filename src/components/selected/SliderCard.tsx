const SliderContent = () => {
  return <></>;
};

const SliderCard = () => {
  return <div className=""></div>;
};

export default SliderCard;

const Slider = () => {
  return (
    <div
      className="min-h-screen w-full bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/Gifs/bgGif.gif)',
        backgroundSize: 'cover',
      }}
    >
      <SliderContent />
    </div>
  );
};
