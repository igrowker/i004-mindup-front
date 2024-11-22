import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { FaRegCircleUser, FaRegCircleQuestion } from "react-icons/fa6";
import { GrTask } from "react-icons/gr";
import { MdEmergency } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "../shared/CustomButton";
import ButtonNav from "./ButtonNav";
import { IoPeopleOutline } from "react-icons/io5";

type DrawerProps = {
  patient?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  const navItems = patient
    ? [
        { to: "/profilePacient", label: "Perfil", Icon: FaRegCircleUser },
        { to: "/selected", label: "Profesionales compatibles", Icon: GrTask },
        { to: null, label: "Asistencia", Icon: MdEmergency },
        { to: null, label: "Mis citas", Icon: FaRegCircleQuestion },
      ]
    : [
        { to: "/profileProfessional", label: "Perfil", Icon: FaRegCircleUser },
        { to: "/selected", label: "Gestión de turnos", Icon: GrTask },
        { to: null, label: "Mis pacientes", Icon: IoPeopleOutline },
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
        className="fixed inset-0 z-50 flex items-start justify-end mt-[3.75rem] right-0"
        onClick={onClose}
      >
        <nav
          className="bg-white w-full shadow-xl flex flex-col gap-2 p-4 border-b-2 border-secondary rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {patient ? (
            <Link to="/home2">
              <ButtonNav label="Ir al inicio" Icon={HiOutlineHome} />
            </Link>
          ) : (
            <Link to="/Home">
              <ButtonNav label="Ir al inicio" Icon={HiOutlineHome} />
            </Link>
          )}

          {navItems.map((item, index) =>
            item.to ? (
              <Link to={item.to} key={index}>
                <ButtonNav label={item.label} Icon={item.Icon} />
              </Link>
            ) : (
              <ButtonNav key={index} label={item.label} Icon={item.Icon} />
            )
          )}

          <div className="flex justify-center mt-2">
            <CustomButton title="Cerrar sesión" appearance={true} />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drawer;
