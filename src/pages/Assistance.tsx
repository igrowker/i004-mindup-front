import { useEffect, useState, useCallback } from "react";
import Loading from "../components/shared/Loading";
import Header from "../components/header/Header";
import Chat from "../components/asistencia/Chat";
import { useSocketStore, useUserStore } from "../context/userStore";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import EmergencyNumber from "../components/asistencia/EmergencyNumber";
import { FaUser } from "react-icons/fa6";

interface SenderInfo {
  name: string;
  image?: string;
}

const Assistance = () => {
  const { user } = useUserStore();
  const { socketData, setSocketData } = useSocketStore();
  const profesionalId = socketData?.professionalId;
  const stompClient = useStompClient();

  const [isLoading, setIsLoading] = useState(true);
  const [psychologistsNotAvailable, setPsychologistsNotAvailable] =
    useState(false);
  const [sender, setSender] = useState<SenderInfo>({
    name: "",
    image: undefined,
  });
  const apiUrl = import.meta.env.VITE_MONGOURL;
  const token = localStorage.getItem("token");

  const notification = useCallback(() => {
    fetch(`${apiUrl}/request-chat/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.statusCode === 404) {
          setPsychologistsNotAvailable(true);
        } else {
          stompClient?.publish({
            destination: `/queue/notifications/${data.professionalId}`,
            body: JSON.stringify({
              professionalId: data.professionalId,
              temporalChatId: data.temporalChatId,
            }),
          });
          setSocketData(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [stompClient, user, setSocketData]);

  useEffect(() => {
    if (isLoading) notification();
  }, [isLoading, notification]);

  useSubscription(`/queue/reply-${profesionalId}`, (message) => {
    if (message.body === "ok") {
      setIsLoading(false);
    } else if (message.body === "cancel") {
      notification();
    }
  });

  const handleSenderChange = (name: string, image?: string) => {
    setSender({ name, image });
  };

  if (psychologistsNotAvailable) {
    return <EmergencyNumber />;
  }

  if (isLoading) {
    return <Loading text />;
  }

  return (
    <div className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background">
      <Header />
      <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4">
        {sender.image ? (
          <img
            src={sender.image}
            alt="Foto del profesional"
            className="size-10 bg-[#989898] rounded-full object-cover"
          />
        ) : (
          <FaUser className="bg-[#989898] fill-zinc-600 rounded-full size-10" />
        )}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg">
            {sender.name
              ? `Estás hablando con ${sender.name}`
              : "Cargando paciente"}
          </h2>
        </div>
      </section>
      <section className="w-full shadow justify-center border flex p-4 items-center border-[#E5E7EB] gap-4">
        <Chat onSenderChange={handleSenderChange} />
      </section>
    </div>
  );
};

export default Assistance;
