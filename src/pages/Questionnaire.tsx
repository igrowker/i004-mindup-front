import { useNavigate } from "react-router-dom";
import QuestionnaireStage from "../components/questionnaire/QuestionnaireStage";
import { useUserStore } from "../context/userStore";
import useQuestionnaireSteps from "../hooks/useQuestionnaireSteps";
import { useEffect } from "react";

export type ViewData = {
  view: number;
  type: "intro" | "question";
  logoSize: string;
  question: string;
  answer?: string;
  options?: string[];
  buttonText?: string;
  buttonNext?: string;
  buttonPrev?: string;
  optionalText?: string;
  allowMultiple?: boolean;
};

const Questionnaire: React.FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const viewsData: ViewData[] = [
    {
      view: 1,
      type: "intro",
      logoSize: "w-60",
      question: "¿Que puedes hacer en Mindup?",
      answer:
        "Encuentra el apoyo emocional que necesitas, cuando lo necesitas.",
      buttonText: "Continuar",
    },
    {
      view: 2,
      type: "intro",
      logoSize: "w-60",
      question: "¿Que puedes hacer en Mindup?",
      answer: "Elige entre nuestros perfiles y agenda una consulta.",
      buttonText: "Continuar",
    },
    {
      view: 3,
      type: "question",
      logoSize: "w-36",
      optionalText: `¡Hola, ${user?.name}!`,
      question: "¿Que tipo de terapia te gustaria realizar?",
      options: [
        "Individual",
        "De pareja",
        "Para un menor de edad, del cual soy responsable",
      ],
      buttonText: "Continuar",
    },
    {
      view: 4,
      type: "question",
      logoSize: "w-36",
      question: "¿Alguna vez has hecho  terapia?",
      options: ["Si, en el pasado", "Si, actualmente", "No, es la primera vez"],
      buttonNext: "Continuar",
      buttonPrev: "Anterior",
    },
    {
      view: 5,
      type: "question",
      logoSize: "w-36",
      optionalText: "Puedes elegir mas de una opción.",
      question: "¿Por qué buscas terapia?",
      options: [
        "Emociones y ánimo",
        "Relaciones interpersonales",
        "Crecimiento personal",
        "Cambios importantes",
        "Hábitos y conductas",
        "Enfermedades y dolores",
      ],
      buttonNext: "Continuar",
      buttonPrev: "Anterior",
      allowMultiple: true,
    },
    {
      view: 6,
      type: "question",
      logoSize: "w-36",
      question: "Prefieres que tu terapista...",
      options: ["Sea un varón", "Sea una mujer", "Es indiferente"],
      buttonNext: "Continuar",
      buttonPrev: "Anterior",
    },
    {
      view: 7,
      type: "question",
      logoSize: "w-36",
      question: "Prefieres que tu terapista...",
      options: [
        "Tenga más de 35 años",
        "Tenga menos de 35 años",
        "Es indiferente",
      ],
      buttonNext: "Continuar",
      buttonPrev: "Anterior",
    },
    {
      view: 8,
      type: "question",
      logoSize: "w-36",
      question: "Indicanos una o varias preferencias horarias",
      options: [
        "Mañana 08:00 - 13:00",
        "Mediodía 13:00 - 18:00",
        "Tarde 18:00 - 22:00",
      ],
      buttonNext: "Continuar",
      buttonPrev: "Anterior",
      allowMultiple: true,
    },
  ];

  useEffect(() => {
    if (user?.role === "PSYCHOLOGIST") {
      navigate("/home");
    }
  }, []);

  const {
    currentStep,
    responses,
    handleNext,
    handlePrevious,
    handleOptionSelect,
  } = useQuestionnaireSteps(viewsData);

  const currentStepData = viewsData[currentStep];

  return (
    <div
      className="min-h-screen w-full bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/Gifs/bgGif.gif)",
        backgroundSize: "cover",
      }}
    >
      <QuestionnaireStage
        currentStepData={currentStepData}
        currentStep={currentStep}
        viewsDataSize={viewsData.length}
        responses={responses}
        handleOptionSelect={handleOptionSelect}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default Questionnaire;
