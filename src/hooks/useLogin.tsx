import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../context/userStore';
import { LoginData, userLogin } from '../api/userLogin';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';

// hook que gestiona la mutacion para hacer el login.
// ¿'que chota es una mutacion'? diras vos camilo con tu acento porteño, sentate q te explico.
// una mutacion es una operacion que modifica datos en sistemas externos, se usan para crear, actualizar o eliminar datos. React query te da el hook useMutation que use abajo para facilitarte la vida con sus estados: isPending (mutacion en progreso), isSuccess (mutacion de exito) isError (mutacion fallida), etc.

const useLoginMutation = () => {
  const { setUser } = useUserStore();

  return useMutation({
    // fn de mutacion:
    mutationFn: async (loginData: LoginData) => {
      const { token } = await userLogin(loginData); // fn que hace la peticion al server

      if (isTokenExpired(token)) {
        throw new Error('El token ha expirado');
      }

      const decodedToken = decodeToken(token); // decodificacion para obtener datos dl user

      return { token, decodedToken }; // devuelvo toke y datos
    },
    onSuccess: ({ token, decodedToken }) => {
      // onSuccess: fn que maneja el caso de exito de la mutacion

      localStorage.setItem('token', token); // guardo token en localstorage
      setUser({
        id: decodedToken.userId,
        email: decodedToken.email,
        role: decodedToken.role,
        name: decodedToken.name,
        image: decodedToken.image
      }); // actualizo estado global con losd atos del user
    },
    onError: (error) => {
      // onError: fn que maneja caso de error en la mutacion
      console.log('Error en el inicio de sesion bro:', error.message);
    },
  });
};

export default useLoginMutation;
