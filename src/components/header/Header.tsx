import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Drawer from "./Drawer";
import { useState } from "react";
import { useUserStore } from "../../context/userStore";
import { GoArrowLeft } from "react-icons/go";

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerUserOpen, setDrawerUserOpen] = useState(false);
  const { user } = useUserStore();
  const location = useLocation();

  const isPaciente = user?.role == "PATIENT";

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
    if (isDrawerUserOpen) setDrawerUserOpen(false);
  };

  const renderBackButton = () => (
    <Link to={"/home"}>
      <GoArrowLeft className="size-5" />
    </Link>
  );

  const renderLogoOrTitle = () =>
    location.pathname === "/home" ? (
      <img src="/public/logo1.png" alt="MindUp Logo" className="h-11" />
    ) : (
      <h2 className="font-medium text-base ">
        {location.pathname.includes("/profile")
          ? "Perfil"
          : location.pathname.includes("/mypatients")
          ? "Mis Pacientes"
          : location.pathname.includes("/selected")
          ? "Profesionales encontrados"
          : location.pathname.includes("/mydates")
          ? "Mis citas"
          : location.pathname.includes("/assistance") ||
            location.pathname.includes("/emergency") ||
            location.pathname.includes("/chatpettient")
          ? "Asistencia"
          : "Gestión de turnos"}
      </h2>
    );

  return (
    <>
      <header className="bg-secondary h-14 w-full px-4 gap-2 text-white flex justify-start items-center sticky top-0 z-50">
        {location.pathname == "/home" ? (
          <button onClick={toggleDrawer}>
            <MdMenu  className="size-5" />
          </button>
        ) : (
          renderBackButton()
        )}

        <div className="h-full flex items-center">{renderLogoOrTitle()}</div>
      </header>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        patient={isPaciente}
      />
    </>
  );
}

export default Header;
