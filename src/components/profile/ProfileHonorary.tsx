import InputSelect from '../shared/Inputs/InputSelect'

const ProfileHonorary = () => {
    return (
        <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
            <h2 className="font-medium">Mis honorarios por sesión</h2>
            <div className="flex justify-center">

                {/*  //todo armar la funcion para establecer el honorario segun eleccion del profesional  */}
                <InputSelect
                    title="$11.000 a $13.000"
                    options={["$11.000 a $13.000", "13.000 a $15.000", "15.000 a $20.000"]}
                    onChange={() => { }}
                />

            </div>
        </article>
    )
}

export default ProfileHonorary