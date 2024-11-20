import { h2 } from "framer-motion/client";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import paciente from "../../../public/Imágenes/MiguelPaciente.png";
import Drawer from "./Drawer";
import DrawerUser from "./DrawerUser";
import { useState } from "react";

function Header() {
  const [isDraweOpen, setDraweOpen] = useState(false); 
  const [isDraweUserOpen, setDraweUserOpen] = useState(false); 


  const location = useLocation();

  const handleToggle = () => {
    setDraweOpen(!isDraweOpen);
    isDraweUserOpen ? setDraweUserOpen(false) : null
  };
  const handleToggleUser = () => {
    setDraweUserOpen(!isDraweUserOpen);
    isDraweOpen ? setDraweOpen(false) : null
  }
  return (
    <>
      <header className="bg-secondary w-full px-4 py-2 gap-2 text-white flex justify-between items-center sticky top-0 z-50">
        <button onClick={() => handleToggle()}>
          <RxHamburgerMenu className="size-6" />
        </button>
        <div className="h-11 flex items-center">
          {location.pathname == "/Home" ? (
            <img src="/public/logo1.png" alt="MindUp Logo" className="h-11" />
          ) : (
            <h2 className="text-xl">
              {location.pathname == "/profile" ? "Perfil" : "Gestión de turnos"}
            </h2>
          )}
        </div>

        <button onClick={() => handleToggleUser()}>
          <img
            src={paciente}
            alt="MindUp Logo"
            className="h-11 rounded-full border-2 border-white"
          />
        </button>
      </header>
      <Drawer isOpen={isDraweOpen} onClose={() => setDraweOpen(false)} />
      <DrawerUser isOpen={isDraweUserOpen} onClose={() => setDraweUserOpen(false)} />
    </>
  );
}

export default Header;
