import { useState, useRef } from 'react';
import Card from './Card';

const cards = [
  { id: 0, title: 'Card 1', description: 'This is the first card.' },
  { id: 1, title: 'Card 2', description: 'This is the second card.' },
  { id: 2, title: 'Card 3', description: 'This is the third card.' },
  { id: 3, title: 'Card 4', description: 'This is the fourth card.' },
  { id: 4, title: 'Card 5', description: 'This is the fifth card.' },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardList, setCardList] = useState(cards);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50 && currentIndex < cardList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const goToNextCard = () => {
    if (currentIndex < cardList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full h-screen  flex flex-col items-center justify-center px-2 sm:px-4"
      style={{
        backgroundImage: 'url(/Gifs/bgGif.gif)',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${cardList.length * 100}%`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cardList.map((card) => (
          <div
            key={card.id}
            className="w-full flex-shrink-0 flex justify-center items-center mt-12"
            style={{ width: '100%' }}
          >
            <Card {...card} />
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary border border-gray-200 text-gray-200 p-2 rounded-full"
          onClick={goToPrevCard}
        >
          &lt;
        </button>
      )}

      {currentIndex < cardList.length - 1 && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary border border-gray-200 text-gray-200 p-2 rounded-full"
          onClick={goToNextCard}
        >
          &gt;
        </button>
      )}

      <div className="absolute bottom-4 flex space-x-2">
        {cardList.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full ${
              index === currentIndex ? 'bg-secondaryBtn' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
