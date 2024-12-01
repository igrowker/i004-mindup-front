import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api/userRegister';

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      console.log('Registro exitoso:', data);
      // Aca habria que manejar la navegacion o lo que sea que hagamos si el registro sale bien.
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Oucrrio un error desconocido :(';
      console.log('Error en el registro:', errorMessage);
      alert(errorMessage);
    },
  });
};

export default useRegisterMutation;
