const URL = 'https://673d45350118dbfe8606b241.mockapi.io/users/pacient'; //Maquetado devolviendo dos usuarios, por eso modifique para que devuelva dos usuarios

// funcion que hace la solicitud http para obtener el user
export const fetchUser = async () => {
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const users = await res.json();
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
