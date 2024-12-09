import CustomButton from "../shared/CustomButton";
import { motion } from "framer-motion";

interface ModalProps {
  title: string;
  hideCancelBtn?: boolean;
  onClose?: () => void;
  onClick: () => void;
}

const Modal = ({ title, hideCancelBtn, onClick, onClose }: ModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 px-2">
        <div className="relative p-4 w-full max-w-md bg-white shadow rounded-2xl">
          <div className="text-center flex justify-between items-center px-6 py-4 w-full font-medium bg-white text-black text-opacity-80">
            <h2 className="overflow-hidden flex-1 shrink gap-1 self-stretch my-auto">
              {title}
            </h2>
          </div>
          <hr className="my-4 -mx-4" />
          <div className="flex gap-5 justify-center my-2">
            {hideCancelBtn ? (
              <CustomButton
                title="Aceptar"
                appearance={true}
                option
                onClick={onClick}
              />
            ) : (
              <>
                <CustomButton
                  title="Cancelar"
                  appearance={false}
                  option
                  onClick={onClose}
                />
                <CustomButton
                  title="Aceptar"
                  appearance={true}
                  option
                  onClick={onClick}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
