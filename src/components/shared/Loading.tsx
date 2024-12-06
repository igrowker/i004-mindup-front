import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Loadingdata {
    text?: boolean;
}

const Loading = ({ text }: Loadingdata) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    const titles = [
        "Te escuchamos. Estamos aquí contigo.",
        "Tu bienestar es nuestra prioridad.",
        "Estamos buscando apoyo inmediato."
    ];

    const fadeInOut = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [titles.length]);

    return (
        <article className="h-screen flex justify-center items-center flex-col w-full gap-8">
            <img src="/Gifs/Loading.gif" alt="Gif de carga" />
            <div className="text-wrap text-secondary text-xl font-bold w-52 text-center">
                {text ? (
                    <motion.p
                        key={currentTitleIndex}
                        {...fadeInOut}
                    >
                        {titles[currentTitleIndex]}
                    </motion.p>
                ) : (
                    <motion.p
                        {...fadeInOut}
                    >
                        Buscando los mejores perfiles profesionales que se adecuen a ti...
                    </motion.p>
                )}
            </div>
            {text && <p className="text-text">Conectándote con un profesional...</p>}
        </article>
    );
};

export default Loading;
