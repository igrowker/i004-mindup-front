// validationUtils.js

export const validateEmail = (email: string) => {
    if (!email) return "El correo no puede estar vacío.";
    if (!email.includes("@")) return "El correo debe incluir '@'.";
    if (!email.includes(".com")) return "El correo debe incluir '.com'.";
    
    const atIndex = email.indexOf("@");
    const dotComIndex = email.indexOf(".com");
    
    // Validar que haya al menos un carácter entre '@' y '.com'
    if (dotComIndex - atIndex <= 1) return "Debe haber texto válido entre '@' y '.com'.";
    
    return ""; // No hay errores
  };
  
  export const validatePassword = (password: string) => {
    if (!password) return "La contraseña no puede estar vacía.";
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una letra mayúscula.";
    if (!/[a-z]/.test(password)) return "La contraseña debe contener al menos una letra minúscula.";
    if (!/\d/.test(password)) return "La contraseña debe contener al menos un número.";
    if (!/[\W_]/.test(password)) return "La contraseña debe contener al menos un caracter especial.";
    
    return ""; // No hay errores
  };
  
  
  export const validateName = (name : string) => {
    if (!name) return "No puede estar vacío.";
    if (name.length < 3) return "Debe tener al menos 3 caracteres.";
    return ""; // No hay errores
  };
  