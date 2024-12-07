import { useState } from "react";
import logo2 from "../../public/logo2.png";
import CustomButton from "../components/shared/CustomButton";
import InputText from "../components/shared/Inputs/InputText";
import { validateEmail } from "../utils/validationUtils";
import { AnimatePresence, motion } from "framer-motion";
import TextError from "../components/shared/Inputs/TextError";
import { useRecoveryModalStore } from "../context/userStore";
import Modal from "../components/modal/Modal";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { openRecoveryModal, toggleRecoveryModal } = useRecoveryModalStore();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<{ email: string }>({ email: "" });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      toggleRecoveryModal()
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const emailError = validateEmail(value);
    setError((prev) => ({ ...prev, email: emailError }));
  };

  const handleAcceptRecovery = () => {
    toggleRecoveryModal();
    navigate("/")
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
              ¿Volver para iniciar sesión?
            </p>
          </Link>
        </div>
      </motion.form>

      {openRecoveryModal && (
        <Modal
          title="Correo enviado. Revise su casilla por favor"
          hideCancelBtn={true}
          onClick={handleAcceptRecovery}
          onClose={toggleRecoveryModal}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
