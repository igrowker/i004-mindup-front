import { FiPlusCircle } from 'react-icons/fi'

const ProfileVideo = () => {
    return (
        <article className="w-[343px] items-center bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
            <p>
                Graba un breve video de presentación (máximo 1 minuto) para que los
                pacientes puedan conocerte mejor.
            </p>
            <div className="w-[290px] flex flex-col items-center border border-dashed border-secondary p-4">
                <FiPlusCircle className="text-secondary size-[22px]" />
                <p className="font-medium text-[#969696]">Subir o grabar un video</p>
            </div>
        </article>
    )
}

export default ProfileVideo