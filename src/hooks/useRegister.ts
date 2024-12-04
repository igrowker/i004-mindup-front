import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api/userRegister';

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: userRegister,
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
