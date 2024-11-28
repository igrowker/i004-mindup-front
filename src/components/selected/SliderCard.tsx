import { useState, useRef, useEffect } from 'react';
import Card from './Card';
import Header from '../header/Header';

export interface CardData {
  id: number;
  first?: boolean;
  name?: string;
  lastname?: string;
  image: string;
  text?: string;
  paragraph?: string[];
  terapy_type?: string;
  attention_type?: string;
  honorarys?: string;
  phrase?: string;
  author?: string;
  song?: string;
}

const cards: CardData[] = [
  {
    id: 0,
    first: true,
    image: '/Imágenes/hojas.png',
    text: 'Ya tenemos a tu posible psicólogo seleccionado',
    paragraph: [
      'Basados en tus necesidades, encontramos a estos 3 perfiles de profesionales perfectos para ti',
      'Agenda un turno con el que sientas mayor afinidad.',
    ],
  },
  {
    id: 1,
    name: 'Trinidad',
    lastname: 'Garcia',
    image: '/Imágenes/trinidadProfesiona.png',
    terapy_type: 'Terapia Cognitivo - Conductual',
    attention_type: 'Virtual y presencial',
    honorarys: '$13.000 a $15.000',
    phrase:
      'Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar',
    author: 'Jacques Lacan',
    song: 'The Beatles - All my loving',
  },
  {
    id: 2,
    name: 'Trinidad',
    lastname: 'Garcia',
    image: '/Imágenes/trinidadProfesiona.png',
    terapy_type: 'Trapia Cognitivo - Conductual',
    attention_type: 'Virtual y presencial',
    honorarys: '$13.000 a $15.000',
    phrase:
      'Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar',
    author: 'Jacques Lacan',
    song: 'The Beatles - All my loving',
  },
  {
    id: 3,
    name: 'Trinidad',
    lastname: 'Garcia',
    image: '/Imágenes/trinidadProfesiona.png',
    terapy_type: 'Trapia Cognitivo - Conductual',
    attention_type: 'Virtual y presencial',
    honorarys: '$13.000 a $15.000',
    phrase:
      'Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar',
    author: 'Jacques Lacan',
    song: 'The Beatles - All my loving',
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardList, setCardList] = useState<CardData[]>([]);

  // Cambio de carga de datos para devops
  useEffect(() => {
    setCardList(cards);
  }, []);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
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
      className="relative overflow-hidden w-full h-screen flex flex-col items-center justify-center px-2 sm:px-4"
      style={{
        backgroundImage: 'url(/Gifs/bgGif.gif)',
        backgroundSize: 'cover',
      }}
    >
      <div className="fixed top-0 w-full">
        <Header />
      </div>
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
            className="w-full flex-shrink-0 flex justify-center items-center mt-14"
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
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-secondaryBtn' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
