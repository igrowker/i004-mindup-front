import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputSelect from "../components/shared/Inputs/InputSelect";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";
import logo2 from "../../public/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validationUtils";
import TextError from "../components/shared/Inputs/TextError";
import { UserData } from "../api/userRegister";
import useRegisterMutation from "../hooks/useRegister";
import useLoginMutation from "../hooks/useLogin";
import { useUserStore } from "../context/userStore";

const RegisterForm = () => {
  // Considerar reducir esta logica a un solo estado que sea un objeto con propiedades:
  const [soy, setSoy] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();
  const loginMutation = useLoginMutation();


  const { setRegistering, registering } = useUserStore();

  const handleValidation = () => {
    const nameError = validateName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const repeatPasswordError =
      password !== repeatPassword ? "Las contraseñas no coinciden." : "";

    setErrors({
      fullName: nameError,
      email: emailError,
      password: passwordError,
      repeatPassword: repeatPasswordError,
    });

    return !nameError && !emailError && !passwordError && !repeatPasswordError;
  };

  const logInPostReg = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          if (soy === "Paciente") {
            navigate("/questionnaire");
          } else {
            navigate("/onboard");
          }

          setRegistering(false); // Desactivar el estado de registro
        },
        onError: () => {
          setRegistering(false); // Asegurarse de limpiar el estado en caso de error
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      const userData: UserData = {
        name: fullName,
        password,
        email,
        role: soy === "Paciente" ? "PATIENT" : "PSYCHOLOGIST",
      };

      setRegistering(true); // Activar el estado de registro
      mutate(userData, {
        onSuccess: () => {
          logInPostReg(); // Procede con el flujo de login
        },
      })
    }
  };

  //Si se unifican los estados de los inputs en uno solo, esto cambia a una version mas modular y centralizada:
  const handleChange = (field: string, value: string) => {
    if (field === "fullName") {
      setFullName(value);
      setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
    } else if (field === "email") {
      setEmail(value);
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (field === "password") {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    } else if (field === "repeatPassword") {
      setRepeatPassword(value);
      setErrors((prev) => ({
        ...prev,
        repeatPassword:
          value !== password ? "Las contraseñas no coinciden." : "",
      }));
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
      {isPending && <p>Registrando...</p>}
      <motion.div
        key={soy}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={logo2} alt="" className="translate-y-[-50px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className={`flex flex-col items-center ${soy ? "gap-4" : "gap-36"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={soy}
              {...fadeInOut}
              className="h-11 w-72 text-center"
            >
              {soy === "" ? (
                <p className="text-text text-center font-semibold">
                  En MindUp, puedes buscar ayuda o brindar tus servicios como
                  profesional.
                </p>
              ) : soy === "Paciente" ? (
                <p className="text-text text-center font-semibold">
                  Encuentra tu psicólogo/a ideal.
                </p>
              ) : (
                <p className="text-text text-center font-semibold">
                  Tú también puedes ser un psicólogo de Mindup.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={soy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InputSelect
              title={soy ? soy : "Soy..."}
              options={["Paciente", "Profesional"]}
              onChange={(e) => setSoy(e.target.value)}
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {soy && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 mt-4 justify-self-center"
              onSubmit={handleSubmit}
            >
              <InputText
                name="Nombre completo *"
                placeholder="Ej. Alicia Gonzalez"
                value={fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              <AnimatePresence>
                {errors.fullName && <TextError text={errors.fullName} />}
              </AnimatePresence>

              <InputText
                name="Email *"
                placeholder="user@user.com"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <AnimatePresence>
                {errors.email && <TextError text={errors.email} />}
              </AnimatePresence>

              <InputPassword
                name="Nueva contraseña *"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <AnimatePresence>
                {errors.password && <TextError text={errors.password} />}
              </AnimatePresence>

              <InputPassword
                name="Repetir nueva contraseña *"
                placeholder="Repita su contraseña"
                value={repeatPassword}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
              />
              <AnimatePresence>
                {errors.repeatPassword && (
                  <TextError text={errors.repeatPassword} />
                )}
              </AnimatePresence>

              <div className="h-36 flex flex-col items-center justify-evenly">
                {" "}
                <CustomButton
                  title={registering ? "Loading..." : "Registrarme"}
                  appearance={true}
                  loading={registering}
                  type="submit"
                />
                <Link to="/">
                  <p className="text-text font-medium text-center mt-2">
                    ¿Ya tienes una cuenta? Inicia sesión aquí
                  </p>
                </Link>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
