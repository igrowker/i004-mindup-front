import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "../shared/CustomButton";
import ButtonNav from "./ButtonNav";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void; // Función para cerrar el modal
};

const DrawerUser: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="drawer"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-start justify-end mt-[3.75rem] right-0"
        onClick={onClose}
      >
        <nav
          className="bg-white w-full shadow-xl flex flex-col gap-2 p-4 border-b-2 border-secondary rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/profileProfessional">
            <ButtonNav label="Perfil" Icon={FaRegCircleUser} />
          </Link>
          <div className="flex justify-center mt-2">
            <CustomButton title="Cerrar sesión" appearance={true} />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default DrawerUser;
