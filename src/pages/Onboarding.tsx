import { useEffect, useState } from 'react';
import FinalView from '../components/onboarding/FinalView';
import OnboardingView from '../components/onboarding/OnboardingView';
import { useUserStore } from '../context/userStore';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [view, setView] = useState(1);
  const [gifBackground, setGifBackground] = useState('');

  const {user} = useUserStore();
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'PATIENT') {
      navigate("/home");
    }
    const loadGif = async () => {
      const gif = await import('/bg2.gif');
      setGifBackground(gif.default);
    };
    loadGif();
  }, []);

  const views = [
    {
      backgroundImage: '/bg1.png',
      logo: '/logo2.png',
      texts: [
        `¡Hola, ${user?.name}!`,
        'Nos alegra que quieras ser parte de nuestra comunidad de psicólogos.',
      ],
      buttonText: 'Comenzar',
    },
    {
      backgroundImage: gifBackground,
      logo: '/logo1.png',
      texts: [
        '¿Qué puedes hacer en Mindup?',
        'Encuentra nuevos pacientes que buscan ayuda profesional',
      ],
      buttonText: 'Continuar',
    },
    {
      backgroundImage: gifBackground,
      logo: '/logo1.png',
      texts: [
        '¿Qué puedes hacer en Mindup?',
        'Agenda consultas con nuevos pacientes en tu zona o de forma virtual.',
      ],
      buttonText: 'Continuar',
    },
    {
      backgroundImage: gifBackground,
      logo: '/logo1.png',
      texts: [
        '¿Qué puedes hacer en Mindup?',
        'Ayuda de forma instantánea a pacientes en emergencia.',
      ],
      buttonText: 'Continuar',
    },
  ];

  const handleNextView = () => {
    if (view < 5) {
      setView(view + 1);
    }
  };

  return (
    <div>
      {view <= 4 ? (
        <OnboardingView
          backgroundImage={views[view - 1].backgroundImage}
          logo={views[view - 1].logo}
          texts={views[view - 1].texts}
          buttonText={views[view - 1].buttonText}
          onButtonClick={handleNextView}
          step={view}
        />
      ) : (
        <FinalView />
      )}
    </div>
  );
};

export default Onboarding;
