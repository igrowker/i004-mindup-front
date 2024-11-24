import React, { useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import { IoPeopleOutline } from "react-icons/io5";
import Modal from "../modal/Modal";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../shared/CustomButton";
import { useModalStore, useUserStore } from "../../context/userStore";
import { toast } from "sonner";


type DrawerProps = {
  patient?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  const { openModal, toggleModal } = useModalStore();
  const { setUser, user } = useUserStore();

  const navigate = useNavigate();

  const handleAccept = () => {
    setUser("")
    toggleModal();
    toast.success('Cierre de sesión exitoso!')
    navigate("/")
  };

  const navItems = patient
    ? [
      { to: "/profile", label: "Perfil", Icon: "public/Íconos/Perfil.svg" },
      {
        to: "/selected",
        label: "Profesionales compatibles",
        Icon: "public/Íconos/ProfesionalesCompatibles.png",
      },
      { to: "/assistance", 
        label: "Asistencia", 
        Icon: "public/Íconos/Asistencia.svg" },
      {
        to: "/mydates",
        label: "Mis citas",
        Icon: "public/Íconos/MisCitas.png",
      },
    ]
    : [
      { to: "/profile", label: "Perfil", Icon: "public/Íconos/Perfil.svg" },
      {
        to: "/manage-appointment",
        label: "Gestión de turnos",
        Icon: "public/Íconos/ProfesionalesCompatibles.png",
      },
      { to: "/mypatients", label: "Mis pacientes", Icon: IoPeopleOutline },
      {
        to: null,
        label: "Ayuda y soporte técnico",
        Icon: FaRegCircleQuestion,
      },
    ];

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="drawer"
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-start justify-start mt-[3.75rem] left-0"
        onClick={onClose}
      >
        <nav
          className="bg-white w-full shadow-xl min-h-[348px] flex flex-col p-4 px-10 text-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/home" className="flex justify-between items-center">
            <button className="flex items-center text-xl ml-2 font-medium gap-2">
              <img
                src="public/Íconos/Inicio.png"
                alt="Icono de incio"
                className="h-6 w-7"
              />{" "}
              <p>Ir a Inicio</p>
            </button>
            <button onClick={onClose}>
              <IoMdClose size={24} />
            </button>
          </Link>

          <div className="w-full my-4 h-[1px] bg-secondary"></div>

          {navItems.map((item, index) => (
            <div key={index}>
              {item.to ? (
                <Link to={item.to}>
                  <ButtonNav label={item.label} Icon={item.Icon} />
                </Link>
              ) : (
                <ButtonNav label={item.label} Icon={item.Icon} />
              )}
              {index < navItems.length - 1 && (
                <div className="w-full my-4 h-[1px] bg-secondary"></div>
              )}
            </div>
          ))}

          <div
            className="flex justify-center mt-4"
          >
            <CustomButton title="Cerrar Sesión" appearance={true} onClick={() => { toggleModal() }} />
            {openModal &&
              <Modal
                title="¿Seguro desea cerrar la sesión?"
                onClick={handleAccept}
              />
            }
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drawer;
