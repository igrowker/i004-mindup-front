import { motion } from "framer-motion";

interface TextErrorProps {
  text: string;
}

function TextError({ text }: TextErrorProps) {
  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };
  return (
    <motion.div {...fadeInOut}>
      <p className="text-red-500 text-center w-72">{text}</p>
    </motion.div>
  );
}

export default TextError;
