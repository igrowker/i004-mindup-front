import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import paciente from "../../../public/Imágenes/MiguelPaciente.png";
import Drawer from "./Drawer";
import DrawerUser from "./DrawerUser";
import { useState } from "react";
import { useUserStore } from "../../context/userStore";
import { FaArrowLeft } from "react-icons/fa";

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerUserOpen, setDrawerUserOpen] = useState(false);
  const { user } = useUserStore();
  const location = useLocation();

  const isPaciente = user?.rol === "Paciente";

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
    if (isDrawerUserOpen) setDrawerUserOpen(false);
  };

  const toggleDrawerUser = () => {
    setDrawerUserOpen((prev) => !prev);
    if (isDrawerOpen) setDrawerOpen(false);
  };

  const renderBackButton = () => (
    <Link to={isPaciente ? "/home2" : "/Home"}>
      <FaArrowLeft className="size-6" />
    </Link>
  );

  const renderLogoOrTitle = () =>
    location.pathname === "/Home" ||
    location.pathname === "/home2" ||
    location.pathname === "/home" ? (
      <img src="/public/logo1.png" alt="MindUp Logo" className="h-11" />
    ) : (
      <h2 className="text-xl">
        {location.pathname.includes("/profile")
          ? "Perfil"
          : "Gestión de turnos"}
      </h2>
    );

  return (
    <>
      <header className="bg-secondary w-full px-4 py-2 gap-2 text-white flex justify-between items-center sticky top-0 z-50">
        {location.pathname === "/Home" || location.pathname === "/home2" ? (
          <button onClick={toggleDrawer}>
            <RxHamburgerMenu className="size-6" />
          </button>
        ) : (
          renderBackButton()
        )}

        <div className="h-11 flex items-center">{renderLogoOrTitle()}</div>

        <button onClick={toggleDrawerUser}>
          <img
            src={paciente}
            alt="User Avatar"
            className="h-11 rounded-full border-2 border-white"
          />
        </button>
      </header>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        patient={isPaciente}
      />
      <DrawerUser
        isOpen={isDrawerUserOpen}
        onClose={() => setDrawerUserOpen(false)}
        patient={isPaciente}
      />
    </>
  );
}

export default Header;
