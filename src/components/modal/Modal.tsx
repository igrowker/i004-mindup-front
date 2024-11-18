import { useState } from 'react';
import CustomButton from '../shared/CustomButton';
import { motion } from "framer-motion";
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';



const Modal = () => {

    // poner en context: question, isOpen, toggleModal, handleAccept
    // En el componente donde se va a usar el modal se debe armar la funcion handleAccept conteniendo toggleModal y un toast
    // Es esta funcion handleAccept la que se pasa como props al modal

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    // Funcion luego de aceptar
    const handleAccept = () => {
        toggleModal();
        toast.success('Cierre de sesión exitoso!')
        navigate("/")
    };

    return (
        <>
            <CustomButton title='Test modal' appearance onClick={toggleModal} />
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md bg-white shadow ">
                            <div className="text-center flex justify-between items-center px-6 py-4 w-full font-medium bg-white text-black text-opacity-80">
                                <h2 className="overflow-hidden flex-1 shrink gap-1 self-stretch my-auto ">
                                    ¿Seguro que desea cerrar sesión?
                                </h2>
                            </div>
                            <hr className='my-4  -mx-4' />
                            <div className='flex gap-5 justify-center'>
                                <CustomButton title='Cancelar' appearance={false} option onClick={toggleModal} />
                                <CustomButton title='Aceptar' appearance={true} option onClick={handleAccept} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Modal;
