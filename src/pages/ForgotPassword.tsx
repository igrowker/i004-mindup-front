import { useState } from "react";
import logo2 from "../../public/logo2.png";
import CustomButton from "../components/shared/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/shared/Inputs/InputText";
import { validateEmail } from "../utils/validationUtils";
import { AnimatePresence, motion } from "framer-motion";
import TextError from "../components/shared/Inputs/TextError";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "" });

  const navigate = useNavigate();

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const handleValidation = () => {
    const emailError = validateEmail(email);
    setError({ email: emailError });

    return !emailError;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (handleValidation()) {
      // Cambiar ruta cuando se envio mail para recuperar contraseña
      navigate("/onboard");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const emailError = validateEmail(value);
    setError((prev) => ({ ...prev, email: emailError }));
  };


  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <div className="h-64 flex flex-col items-center justify-evenly">
        <img src={logo2} alt="Logo" />
        <p className="text-text font-medium">
          Por favor ingrese su email para recibir el link
        </p>
      </div>
      <motion.form
        {...fadeInOut}
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <InputText
          name="Email *"
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <AnimatePresence>
          {error.email && <TextError text={error.email} />}
        </AnimatePresence>


        <div className="h-36 flex flex-col items-center justify-evenly">
          <CustomButton
            title="Enviar"
            appearance={true}
            type="submit"
          />
          <Link to="/">
            <p className="text-text font-medium text-center">
              ¿Volver a iniciar sesión?
            </p>
          </Link>
        </div>

      </motion.form>
    </div>
  );
};

export default ForgotPassword;
