import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../shared/Inputs/InputText";
import DynamicButton from "./DynamicButton";
import TextError from "../shared/Inputs/TextError";
import CustomButton from "../shared/CustomButton";

const FinalView: React.FC = () => {
  const [formData, setFormData] = useState({
    specialty: "",
    matricula: "",
    zone: "",
    attention: {
      virtual: false,
      presencial: false,
    },
    about: "",
  });

  const [errors, setErrors] = useState({
    specialty: "",
    matricula: "",
    zone: "",
    about: "",
    attention: "",
  });

  const navigate = useNavigate();

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Validaciones dinámicas
    if (field === "about") {
      setErrors((prev) => ({
        ...prev,
        about:
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
    }
  };

  const handleCheckboxChange = (type: "virtual" | "presencial") => {
    setFormData((prev) => ({
      ...prev,
      attention: {
        ...prev.attention,
        [type]: !prev.attention[type],
      },
    }));
    setErrors((prev) => ({
      ...prev,
      attention:
        !formData.attention.virtual && !formData.attention.presencial
          ? "Debes seleccionar al menos un tipo de atención."
          : "",
    }));
  };

  const handleValidation = () => {
    const newErrors = {
      specialty: formData.specialty ? "" : "La especialidad es obligatoria.",
      matricula: formData.matricula ? "" : "La matrícula no puede estar vacía.",
      zone: formData.zone ? "" : "La zona de atención es obligatoria.",
      about: formData.about
        ? formData.about.length > 100
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidation()) {
      // Aquí puedes agregar lógica para enviar los datos al backend
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Cuéntanos sobre ti {localStorage.getItem("name") || ""} <br /> para
        empezar a ayudar
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
            value={formData.about}
            onChange={(e) => handleChange("about", e.target.value)}
            className="w-full h-18 p-3 border border-gray-300 rounded-sm resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {formData.about.length}/100 caracteres
          </p>
          {errors.about && <TextError text={errors.about} />}
        </div>
        <div className="w-full flex justify-center">
          <CustomButton title="Guardar" appearance type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FinalView;
