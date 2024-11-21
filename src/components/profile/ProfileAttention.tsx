
const ProfileAttention = () => {
    return (
        <article className="w-[343px] bg-background my-2 pb-2 px-6 gap-2 flex flex-col text-base rounded-2xl leading-tight">
            <label className="font-medium">Tipo de atención</label>
            <div className="flex items-center justify-between space-x-4">
                <label
                    className="w-32 flex items-center px-3 py-2 border border-gray-300 rounded-sm cursor-pointer"
                    onClick={() => { }}
                // onClick={() => handleCheckboxChange("virtual")}
                >
                    <input
                        type="checkbox"
                        onChange={() => { }}
                        // checked={formData.attention.virtual}
                        // onChange={() => handleCheckboxChange("virtual")}
                        className="mr-2"
                    />
                    <span className="text-gray-700">Virtual</span>
                </label>
                <label
                    className="w-32 flex items-center px-3 py-2 border border-gray-300 rounded-sm cursor-pointer"
                    onClick={() => { }}
                // onClick={() => handleCheckboxChange("presencial")}
                >
                    <input
                        type="checkbox"
                        onChange={() => { }}
                        // checked={formData.attention.presencial}
                        // onChange={() => handleCheckboxChange("presencial")}
                        className="mr-2"
                    />
                    <span className="text-gray-700">Presencial</span>
                </label>
            </div>
        </article>
    )
}

export default ProfileAttention