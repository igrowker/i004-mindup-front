import { GoArrowLeft } from 'react-icons/go'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileInformation from '../components/profile/ProfileInformation'

const ProfilePacient = () => {

    const pacient = {
        imagen: "/Imágenes/miguel.png",
        nombre: "Miguel Rojas",
        especialidad: "Ha realizado terapia anteriormente",
        frase: {
            autor: "Anónimo",
            texto: "La paz comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones."
        },
    }

    return (
        <main className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
            <header className="bg-secondary w-full pl-2 py-5 text-white flex items-center">
                <button className="p-1">
                    <GoArrowLeft />
                </button>
                <span>Perfil</span>
            </header>
            <ProfileHeader
                imagen={pacient.imagen}
                nombre={pacient.nombre}
                especialidad={pacient.especialidad}
            />
            <ProfileInformation
                fraseAutor={pacient.frase.autor}
                fraseTexto={pacient.frase.texto}
            />

        </main>
    )
}

export default ProfilePacient