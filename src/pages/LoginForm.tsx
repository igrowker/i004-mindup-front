import logo from "../../public/logo2.png";
import { motion } from "framer-motion";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <div className="h-64 flex flex-col items-center justify-evenly">
        <img src={logo} alt="logo 2" />
        <p className="text-text text-2xl font-medium ">Bienvenido a Mindup</p>
      </div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-2 "
      >
        <InputText name="Email *" placeholder="Ingrese su email " />
        <InputPassword
          name="Contraseña *"
          placeholder="Ingrese su contraseña"
        />
        <Link to="/register">
          <p className="text-[#0a135d] text-sm font-medium text-end mt-2 underline">
            ¿Ha olvidado su contraseña?
          </p>
        </Link>

        <div className="h-36 flex flex-col items-center justify-evenly">

        <CustomButton
          title="Iniciar Sesión"
          appearance={true}
          onClick={() => navigate("/onboard")}
        />
        <Link to="/register">
      <p className="text-text font-medium text-center">¿Eres nuevo? Regístrate aquí </p>
      </Link>

      </div>

      </motion.form>

    </div>
  );
}

export default LoginForm;
