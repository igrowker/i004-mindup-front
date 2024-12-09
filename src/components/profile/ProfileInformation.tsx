import { IoIosArrowForward } from "react-icons/io"

interface ProfileData {
    fraseAutor: string;
    fraseTexto: string;
}

const ProfileInformation = ({ fraseAutor, fraseTexto }: ProfileData) => {

    
    return (
        <>
            {/* Frase personal */}
            <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
                <div className="text-start">
                    <h2 className="font-medium text-base">Frase que me identifica</h2>
                </div>
                <p><strong><q><i>
                {fraseTexto}
                </i></q></strong></p>
                <p className="self-end">-{fraseAutor}</p>
            </article>

            {/* Sobre ti */}
            <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
                <h2 className="font-medium">Sobre mi</h2>
                <p className="text-[#969696]">
                    Es tu oportunidad para llamar la atención de tus pacientes, tu
                    historia, experiencia e intereses.
                </p>
            </article>

            {/* Mas sobre ti */}
            <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
                <h2 className="font-medium">Más sobre mi</h2>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h3>Idiomas</h3>
                        <div className="flex items-center text-[#969696]">
                            Vacío <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h3>Animales</h3>
                        <div className="flex items-center text-[#969696]">
                            Vacío <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h3>Alimentación</h3>
                        <div className="flex items-center text-[#969696]">
                            Vacío <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h3>Zodíaco</h3>
                        <div className="flex items-center text-[#969696]">
                            Vacío <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h3>Pronombre</h3>
                        <div className="flex items-center text-[#969696]">
                            Vacío <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            </article>

            {/* Cancion */}
            <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
                <h2 className="font-medium">Tu canción</h2>
                <p>The Beatles - All my loving</p>
            </article>
        </>
    )
}

export default ProfileInformation