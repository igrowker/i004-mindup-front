import { motion } from "framer-motion";
import CustomButton from "../components/shared/CustomButton";
import Header from "../components/header/Header";

const Emergency = () => {

    const fadeInOut = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
    }

    return (
        <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
            <Header />
            <article className="h-screen p-6 flex justify-center items-center flex-col w-full gap-8">
                <p className="text-wrap text-secondary text-2xl font-bold w-60 text-center">
                    Miguel, tu bienestar es nuestra prioridad.
                </p>
                <p className="text-text text-center px-12">Todos los profesionales disponibles están atendiendo a un paciente en este momento.</p>
                <motion.div
                    {...fadeInOut}
                >
                    <CustomButton title="Llamar a número de emergencia" appearance={true} />
                </motion.div>
            </article >
        </div>
    )
}

export default Emergency