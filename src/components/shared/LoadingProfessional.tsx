
const LoadingProfessional = ({asis}) => {
    return (
        <article className="h-screen flex justify-center items-center flex-col w-full gap-8">
            <img src="public/Gifs/Loading.gif" alt="Gif de carga" />
            <p className="text-wrap font-medium w-52 text-center">
                Buscando los mejores perfiles profesionales que se adecuen a ti...
            </p>
            {asis && (<p>asdad</p>)}
        </article>
    )
}

export default LoadingProfessional