"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IClient } from "@/types/client-interface";
import { IMessage } from "@/types/message-interface";
import { Hash, MessageCircle, Plus } from "lucide-react";
import MessageChat from "./message";

interface IChatArea {
  rooms: IRoom[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  salaSeleccionada: number | null;
  salaActual: IRoom | undefined;
  mensajes: IMessage[];
  client: IClient;
  mensajesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatArea({
  rooms,
  setOpen,
  salaSeleccionada,
  salaActual,
  mensajes,
  client,
  mensajesEndRef,
}: Readonly<IChatArea>) {
  return (
    <>
      {rooms.length === 0 ? (
        /* Estado: No hay salas */
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay salas disponibles
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera sala y conoce nuevos amigos
            </p>
            <Button
              onClick={() => setOpen(true)}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Sala
            </Button>
          </div>
        </div>
      ) : !salaSeleccionada ? (
        /* Estado: Ninguna sala seleccionada */
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hash className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Selecciona una sala
            </h3>
            <p className="text-gray-600">
              Elige una sala de la lista para ver los mensajes
            </p>
          </div>
        </div>
      ) : (
        /* Chat activo */

        <div className="flex flex-col h-screen">
          {/* Header del chat */}
          <div className="sticky top-0 z-10  bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-gray-500" />
              <h1 className="font-semibold text-gray-900">
                {salaActual?.name}
              </h1>
              <Separator orientation="vertical" className="h-6" />
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 h-0">
            <ScrollArea className="h-full px-4 py-6 bg-gray-50">
              <div className="flex flex-col gap-2">
                <MessageChat
                  mensajes={mensajes}
                  client={client}
                  mensajesEndRef={mensajesEndRef}
                  salaActual={salaActual}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
