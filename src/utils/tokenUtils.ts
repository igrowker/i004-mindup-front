import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
  [key: string]: any; // Si el token tiene más propiedades dinámicas
}

// Decodifica un token JWT y retorna el payload.

export const decodeToken = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    throw new Error('Error al decodificar el token');
  }
};

// Verifica si un token ha expirado.

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = decodeToken(token);
    return exp * 1000 < Date.now(); // `exp` está en segundos, mientras que `Date.now()` da milisegundos
  } catch {
    return true; // Si el token no se puede decodificar, lo tratamos como expirado
  }
};
