import logo2 from "../../public/logo2.png";
import CustomButton from "../components/shared/CustomButton";
import InputText from "../components/shared/Inputs/InputText";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full min-w-mobile flex flex-col items-center justify-center bg-background">
            <img src={logo2}></img>
            <div>
                <div className="flex flex-col items-center mt-4 gap-20">
                    <div className="h-11 w-72 text-center">
                        <p className="text-text text-center font-semibold">
                            Por favor ingrese su email para recibir el link
                        </p>
                    </div>
                    <form className="flex flex-col items-center gap-6">
                        <div className="flex flex-col gap-6 w-80">
                            <InputText name="Email *" placeholder="user@user.com" />
                            <div className="flex flex-col gap-2 w-80">
                                <CustomButton
                                    title="Enviar"
                                    appearance={true}
                                />
                                <CustomButton
                                    title="Volver"
                                    appearance={false}
                                    onClick={() => navigate("/")}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
