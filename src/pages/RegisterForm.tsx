import { useState } from "react";
import InputSelect from "../components/shared/Inputs/InputSelect";
import InputText from "../components/shared/Inputs/InputText";
import InputPassword from "../components/shared/Inputs/InputPassword";
import CustomButton from "../components/shared/CustomButton";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm = () => {
  const [soy, setSoy] = useState("");
  
  return (
    <>
      <div className="mx-[44px] h-full">
        <div className="flex flex-col h-[600px] w-full justify-center items-center">
        <p className="text-center text-2xl font-semibold">Tú tambien puedes ser un psicólogo de Mindup</p>
        <InputSelect
          title="Soy..."
          options={["Paciente", "Profesional"]}
          onChange={(e) => {
            setSoy(e.target.value);
          }}
        />
        </div>
        <div className="">
        <form action="" className="flex flex-col gap-2">
          <InputText name="Nombre completo" placeholder="Ej. Alicia Gonzalez" />
          <InputText name="Email" placeholder="user@user.com" />
          <InputPassword
            name="Nueva contraseña"
            placeholder="Ingrese su contraseña"
          />
          <InputPassword
            name="Repetir nueva contraseña"
            placeholder="Ingrese su contraseña"
          />
          <CustomButton title="Registrarme" appearance={true}/>
        </form>
      </div>
      </div>
    </>
  );
};

export default RegisterForm;
