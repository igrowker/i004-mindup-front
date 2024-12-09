import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../shared/Inputs/InputText";
import TextError from "../shared/Inputs/TextError";
import CustomButton from "../shared/CustomButton";
import InputGender from "./InputGender";
import InputBirthDate from "../shared/Inputs/InputBirthDate";
import { useUserStore } from "../../context/userStore";
import { OnBoardData, userOnBoard } from "../../api/userOnboard";

const FinalView: React.FC = () => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    information: "",
    gender: "",
    specialty: "",
    matricula: "",
    zone: "",
    birth: "",
    attention: {
      virtual: false,
      presencial: false,
    },
  });

  const [errors, setErrors] = useState({
    gender: "",
    specialty: "",
    matricula: "",
    zone: "",
    birth: "",
    information: "",
    attention: "",
  });

  const navigate = useNavigate();
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Validaciones dinámicas
    if (field === "information") {
      setErrors((prev) => ({
        ...prev,
        information:
          (value as string).length > 100
            ? "El texto no puede exceder los 100 caracteres."
            : value
            ? ""
            : "El campo sobre ti no puede estar vacío.",
      }));
    } else if (field === "matricula") {
      setErrors((prev) => ({
        ...prev,
        matricula: value ? "" : "La matrícula no puede estar vacía.",
      }));
    } else if (field === "specialty") {
      setErrors((prev) => ({
        ...prev,
        specialty: value ? "" : "La especialidad es obligatoria.",
      }));
    } else if (field === "zone") {
      setErrors((prev) => ({
        ...prev,
        zone: value ? "" : "La zona de atención es obligatoria.",
      }));
    } else if (field === "birth") {
      setErrors((prev) => ({
        ...prev,
        birth: value ? "" : "La fecha de nacimiento es obligatoria.",
      }));
    } else if (field === "gender") {
      setErrors((prev) => ({
        ...prev,
        gender: value ? "" : "El género es obligatorio.",
      }));
    }
  };

  const handleCheckboxChange = (type: "virtual" | "presencial") => {
    setFormData((prev) => {
      const updatedAttention = {
        ...prev.attention,
        [type]: !prev.attention[type],
      };

      setErrors((prevErrors) => ({
        ...prevErrors,
        attention:
          !updatedAttention.virtual && !updatedAttention.presencial
            ? "Debes seleccionar al menos un tipo de atención."
            : "",
      }));

      return {
        ...prev,
        attention: updatedAttention,
      };
    });
  };
  const handleValidation = () => {
    const newErrors = {
      gender: formData.gender ? "" : "El género es obligatorio.",
      specialty: formData.specialty ? "" : "La especialidad es obligatoria.",
      matricula: formData.matricula ? "" : "La matrícula no puede estar vacía.",
      zone: formData.zone ? "" : "La zona de atención es obligatoria.",
      birth: formData.birth ? "" : "La fecha de nacimiento es obligatoria.",
      information: formData.information
        ? formData.information.length > 100
          ? "El texto no puede exceder los 100 caracteres."
          : ""
        : "El campo sobre ti no puede estar vacío.",
      attention:
        !formData.attention.virtual && !formData.attention.presencial
          ? "Debes seleccionar al menos un tipo de atención."
          : "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      if (!user) {
        console.error("No se ha iniciado sesión.");
        return;
      }

      // Transformar formData a OnBoardData
      const onBoardData: OnBoardData = {
        gender: formData.gender,
        specialty: formData.specialty,
        tuition: formData.matricula, // Cambiar nombre
        zone: formData.zone,
        birth: formData.birth,
        information: formData.information,
      };

      try {
        await userOnBoard(onBoardData, user.id);
        navigate("/home");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Cuéntanos sobre ti {""} <br /> para empezar a ayudar
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md mb-4">
          <InputText
            name="Especialidad*"
            placeholder="Clínica"
            value={formData.specialty}
            onChange={(e) => handleChange("specialty", e.target.value)}
          />
          {errors.specialty && <TextError text={errors.specialty} />}
        </div>
        <div className="w-full max-w-md mb-4">
          <InputGender
            title="Selecciona tu género*"
            options={[
              { label: "Hombre", value: "MALE" },
              { label: "Mujer", value: "FEMALE" },
              { label: "Otro", value: "OTHER" },
            ]}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          {errors.gender && <TextError text={errors.gender} />}
        </div>

        <div className="w-full max-w-md mb-4">
          <InputBirthDate
            name="Fecha de Nacimiento*"
            placeholder="yyyy-MM-dd"
            value={formData.birth}
            onChange={(e) => handleChange("birth", e.target.value)}
          />
          {errors.birth && <TextError text={errors.birth} />}
        </div>

        <div className="w-full max-w-md mb-4">
          <InputText
            name="Matrícula*"
            placeholder="3265"
            value={formData.matricula}
            onChange={(e) => handleChange("matricula", e.target.value)}
          />
          {errors.matricula && <TextError text={errors.matricula} />}
        </div>
        <div className="w-full max-w-md mb-4">
          <InputText
            name="Zona de atención*"
            placeholder="Coloca tu CP"
            value={formData.zone}
            onChange={(e) => handleChange("zone", e.target.value)}
          />
          {errors.zone && <TextError text={errors.zone} />}
        </div>
        <div className="w-full max-w-md mb-4">
          <label className="font-bold my-1 block mb-1">Tipo de atención*</label>
          <div className="flex items-center justify-between space-x-4">
            <label
              className="w-32 flex items-center px-3 py-2 border border-gray-300 rounded-sm cursor-pointer"
              onClick={() => handleCheckboxChange("virtual")}
            >
              <input
                type="checkbox"
                checked={formData.attention.virtual}
                onChange={() => handleCheckboxChange("virtual")}
                className="mr-2"
              />
              <span className="text-gray-700">Virtual</span>
            </label>
            <label
              className="w-32 flex items-center px-3 py-2 border border-gray-300 rounded-sm cursor-pointer"
              onClick={() => handleCheckboxChange("presencial")}
            >
              <input
                type="checkbox"
                checked={formData.attention.presencial}
                onChange={() => handleCheckboxChange("presencial")}
                className="mr-2"
              />
              <span className="text-gray-700">Presencial</span>
            </label>
          </div>
          {errors.attention && <TextError text={errors.attention} />}
        </div>
        <div className="w-full max-w-md mb-2">
          <label
            htmlFor="descripcion"
            className="text-sm font-semibold text-gray-800 block mb-1"
          >
            ¿Qué te motiva como profesional?
          </label>
          <textarea
            id="descripcion"
            placeholder="Cuéntanos tus motivaciones y valores."
            maxLength={100}
            value={formData.information}
            onChange={(e) => handleChange("information", e.target.value)}
            className="w-full h-18 p-3 border border-gray-300 rounded-sm resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {formData.information.length}/100 caracteres
          </p>
          {errors.information && <TextError text={errors.information} />}
        </div>
        <div className="w-full flex justify-center">
          <CustomButton title="Guardar" appearance type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FinalView;
