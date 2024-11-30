import logo from "../../public/logo2.png";
import { AnimatePresence, motion } from "framer-motion";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../utils/validationUtils";
import TextError from "../components/shared/Inputs/TextError";
import { useUserStore } from "../context/userStore";
import { userLogin } from "../api/userLogin";
import { decodeToken, isTokenExpired } from "../utils/tokenUtils";


function LoginForm() {
  const { setUser, user } = useUserStore(); // Estado global
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const handleValidation = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!handleValidation()) {
      return;
    }
  
    setIsLoading(true);
    setApiError(null);
  
    try {
      const { token } = await userLogin({ email, password }); // Llamada a la API
      localStorage.setItem("token", token); // Guarda el token para solicitudes posteriores
  
      // Verificar si el token es válido antes de decodificarlo
      if (isTokenExpired(token)) {
        throw new Error("El token ha expirado");
      }
  
      // Decodificar el token
      const decodedToken = decodeToken(token);
  
      // Guardar datos del usuario en el estado global
      setUser({ id: decodedToken.userId, email, role: decodedToken.role });
  
      navigate("/home"); // Navega a la página principal
    } catch (error: any) {
      setApiError(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    console.log("Estado global user ha cambiado:", user);
  }, [user]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const emailError = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: emailError }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const passwordError = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: passwordError }));
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <div className="h-64 flex flex-col items-center justify-evenly">
        <img src={logo} alt="logo 2" />
        <p className="text-text text-2xl font-medium">Bienvenido a Mindup</p>
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
          {errors.email && <TextError text={errors.email} />}
        </AnimatePresence>

        <InputPassword
          name="Contraseña *"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <AnimatePresence>
          {errors.password && <TextError text={errors.password} />}
        </AnimatePresence>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <Link to="/forgotPassword">
          <p className="text-[#0a135d] text-sm font-medium text-end mt-2 underline">
            ¿Ha olvidado su contraseña?
          </p>
        </Link>

        <div className="h-36 flex flex-col items-center justify-evenly">
          <CustomButton
            title={isLoading ? "Loading..." : "Iniciar sesión"}
            appearance={true}
            loading={isLoading}
            type="submit"
          />
          <Link to="/register">
            <p className="text-text font-medium text-center">
              ¿Eres nuevo? Regístrate aquí
            </p>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}

export default LoginForm;
