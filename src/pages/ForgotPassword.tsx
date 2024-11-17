import { useState } from "react";
import logo2 from "../../public/logo2.png";
import CustomButton from "../components/shared/CustomButton";
import InputEmail from "../components/shared/Inputs/InputEmail";
import { useNavigate } from "react-router-dom";
import InputText from "../components/shared/Inputs/InputText";
import { validateEmail } from "../utils/validationUtils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setEmail(value);
    setError(validateEmail(value)); // Validar el email mientras escribe
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!error && email) {
      // Lógica de envío del formulario (ej. redirigir o enviar email)
      navigate("/reset-password"); // Redirige a la página de reset
    }
  };

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <img src={logo2} alt="Logo" className="mb-6" />
      <div className="flex flex-col items-center mt-4 gap-20">
        <div className="h-11 w-72 text-center">
          <p className="text-text text-center font-semibold">
            Por favor ingrese su email para recibir el link
          </p>
        </div>
        <form className="flex flex-col items-center gap-6 w-80" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 w-full">
            <InputText
              name="Email *"
              placeholder="user@user.com"
              value={email}
              onChange={handleChange}
            />
            {error && (
              <div {...fadeInOut}>
                <p className="text-red-500 text-center">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-2 w-full">
              <CustomButton
                title="Enviar"
                appearance={true}
                type="submit"
              />
              <CustomButton
                title="Volver"
                appearance={false}
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
