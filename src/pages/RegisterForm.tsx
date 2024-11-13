import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputSelect from "../components/shared/Inputs/InputSelect";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";

const RegisterForm = () => {
  const [soy, setSoy] = useState("");

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flex flex-col items-center ${soy ? "gap-4" : "gap-36"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div key={soy} {...fadeInOut} className="h-11 w-72 text-center">
              {soy === "" ? (
                <p className="text-text text-center font-semibold">
                  En MindUp, puedes buscar ayuda o brindar tus servicios como
                  profesional.
                </p>
              ) : soy === "Paciente" ? (
                <p className="text-text ext-center font-semibold">
                  Encuentra tu psicólogo/a ideal.
                </p>
              ) : (
                <p className="text-text text-center font-semibold">
                  Tú también puedes ser un psicólogo de Mindup.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <InputSelect
            title="Soy..."
            options={["Paciente", "Profesional"]}
            onChange={(e) => setSoy(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {soy && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 mt-4"
            >
              <InputText
                name="Nombre completo *"
                placeholder="Ej. Alicia Gonzalez"
              />
              <InputText name="Email *" placeholder="user@user.com" />
              <InputPassword
                name="Nueva contraseña *"
                placeholder="Ingrese su contraseña"
              />
              <InputPassword
                name="Repetir nueva contraseña *"
                placeholder="Ingrese su contraseña"
              />
              <CustomButton title="Registrarme" appearance={true} />
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
