import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputSelect from "../components/shared/Inputs/InputSelect";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";
import logo2 from "../../public/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import InputEmail from "../components/shared/Inputs/InputEmail";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    soy: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Verifica si las contraseñas coinciden y oculta el mensaje de error si lo hacen
    if (name === "confirmPassword" || name === "password") {
      setPasswordMatch(
        formData.password !== value && name === "confirmPassword"
      );
    }
  };

  const validate = (e : any) => {
    e.preventDefault();
    const { password, confirmPassword, soy, name, email } = formData;

    if (password !== confirmPassword) {
      setPasswordMatch(true);
      return;
    }
    console.log(
      "Soy:",
      soy,
      "Name:",
      name,
      "Email:",
      email,
      "Password:",
      password
    );
    navigate("/");
  };

  const renderMessage = () => {
    switch (formData.soy) {
      case "":
        return "En MindUp, puedes buscar ayuda o brindar tus servicios como profesional.";
      case "Paciente":
        return "Encuentra tu psicólogo/a ideal.";
      case "Profesional":
        return "Tú también puedes ser un psicólogo de Mindup.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <motion.div {...fadeInOut}>
        <img src={logo2} alt="Logo" className="translate-y-[-50px]" />
      </motion.div>

      <motion.div {...fadeInOut}>
        <div
          className={`flex flex-col items-center ${
            formData.soy ? "gap-4" : "gap-36"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={formData.soy}
              {...fadeInOut}
              className="h-11 w-72 text-center"
            >
              <p className="text-text text-center font-semibold">
                {renderMessage()}
              </p>
            </motion.div>
          </AnimatePresence>

          <InputSelect
            title={formData.soy || "Soy..."}
            options={["Paciente", "Profesional"]}
            onChange={(e) =>
              handleChange({ target: { name: "soy", value: e.target.value } })
            }
          />
        </div>

        <AnimatePresence>
          {formData.soy && (
            <motion.form
              {...fadeInOut}
              className="flex flex-col gap-2 mt-4"
              onSubmit={validate}
            >
              <InputText
                name="name"
                placeholder="Ej. Alicia Gonzalez"
                value={formData.name}
                onChange={handleChange}
              />
              <InputEmail
                name="email"
                placeholder="user@user.com"
                value={formData.email}
                onChange={handleChange}
              />
              <InputPassword
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <InputPassword
                name="confirmPassword"
                placeholder="Ingrese su contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordMatch && (
                <AnimatePresence mode="wait">
                  <motion.div {...fadeInOut}>
                    <p className="text-red-500 text-center">
                      Las contraseñas no coinciden
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}
              <CustomButton
                title="Registrarme"
                appearance={true}
                type="submit"
              />
              <Link to="/">
                <p className="text-text font-medium text-center mt-2">
                  ¿Ya tienes una cuenta? Inicia sesión aquí
                </p>
              </Link>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
