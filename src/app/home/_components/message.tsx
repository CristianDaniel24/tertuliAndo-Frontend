import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IClient } from "@/types/client-interface";
import { IMessage } from "@/types/message-interface";
import { Coffee } from "lucide-react";

interface IMessageChat {
  mensajes: IMessage[];
  client: IClient;
  mensajesEndRef: React.RefObject<HTMLDivElement | null>;
  salaActual: IRoom | undefined;
}

export default function MessageChat({
  mensajes,
  client,
  mensajesEndRef,
  salaActual,
}: Readonly<IMessageChat>) {
  return (
    <>
      {mensajes.length > 0 ? (
        <div className="space-y-4">
          {mensajes.map((msg) => {
            const esMio = msg.senderClient?.id === client?.id;
            return (
              <div
                key={msg.id}
                className={`flex gap-2 px-2 ${
                  esMio ? "justify-end" : "justify-start"
                }`}
              >
                {!esMio && (
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-amber-500 text-white text-sm">
                      {msg.senderClient?.name?.charAt(0).toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[700px] rounded-2xl p-3 text-sm relative shadow ${
                    esMio
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <div className="mb-1 font-medium">
                    {esMio ? "Tú" : msg.senderClient?.name}
                  </div>

                  <div className="break-words whitespace-pre-line">
                    {msg.text}
                  </div>

                  <span
                    className={`block text-[13px] mt-2 text-right ${
                      esMio ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {msg.sentAt
                      ? new Date(msg.sentAt).toLocaleTimeString("es-CO", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "Ahora"}
                  </span>
                </div>

                {esMio && (
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {client?.name?.charAt(0).toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
          <div ref={mensajesEndRef} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Coffee className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¡Qué silencio por aquí!
          </h3>
          <p className="text-gray-600 text-center max-w-sm">
            Sé el primero en enviar un mensaje en #{salaActual?.name}
          </p>
        </div>
      )}
    </>
  );
}
