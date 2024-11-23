import { useState, useRef } from 'react';

const cards = [
  { id: 0, title: 'Card 1', description: 'This is the first card.' },
  { id: 1, title: 'Card 2', description: 'This is the second card.' },
  { id: 2, title: 'Card 3', description: 'This is the third card.' },
  { id: 3, title: 'Card 4', description: 'This is the fourth card.' },
  { id: 4, title: 'Card 5', description: 'This is the fifth card.' },
  { id: 5, title: 'Card 6', description: 'This is the first card.' },
];

const Card = () => {
  return (
    <div
      className="bg-[#ffffff] shadow-md rounded-lg p-6 text-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[60%]"
      style={{ minHeight: '74vh' }}
    ></div>
  );
};

const CardsContainer = () => {
  return (
    <div className="flex justify-center items-end w-full min-h-screen pb-12">
      <Card />
    </div>
  );
};

const Slider = () => {
  return (
    <div
      className="min-h-screen w-full bg-center bg-no-repeat flex"
      style={{
        backgroundImage: 'url(/Gifs/bgGif.gif)',
        backgroundSize: 'cover',
      }}
    >
      <CardsContainer />
    </div>
  );
};

export default Slider;
