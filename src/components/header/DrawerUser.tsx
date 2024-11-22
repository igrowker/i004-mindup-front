import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import Modal from "../modal/Modal";

type DrawerProps = {
  patient: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const DrawerUser: React.FC<DrawerProps> = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;
  const [salir, setSalir] = useState(false);

  const profileLink = patient ? "/profilePacient" : "/profileProfessional";

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="drawer-user"
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
          <Link to={profileLink}>
            <ButtonNav label="Perfil" Icon={FaRegCircleUser} />
          </Link>

          <div
            className="flex justify-center mt-2"
            onClick={() => setSalir(true)}
          >
            <Modal
              title="Cerrar sesión"
              isOpen={salir}
              onClose={() => setSalir(false)}
            />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default DrawerUser;
