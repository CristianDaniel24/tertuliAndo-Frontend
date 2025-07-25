"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  MessageCircle,
  Hash,
  Coffee,
  Smile,
  Send,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { roomService } from "@/service/room.service";
import RoomForm from "./_components/room-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { signinService } from "@/service/signin.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sessionUtils } from "../utils/session.utils";
import { roomClientService } from "@/service/room-client.service";
import { IRoomClient } from "@/types/room-client-interface";
import { messageService } from "@/service/message.service";
import { IMessage } from "@/types/message-interface";

export default function SalasPage() {
  const [salaSeleccionada, setSalaSeleccionada] = useState<number | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [client, setClient] = useState<any>(null);
  const salaActual = rooms.find((sala) => sala.id === salaSeleccionada);
  const [mensajes, setMensajes] = useState<IMessage[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getAll();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const clientFromSession = sessionUtils.getPersonFromSession();
    setClient(clientFromSession);
  }, []);

  useEffect(() => {
    const handleRoomClient = async () => {
      if (!client?.id || !salaSeleccionada) return;

      const roomClient = {
        room: { id: salaSeleccionada },
        client: { id: client.id },
      } as IRoomClient;

      try {
        const messagesRoom = await roomClientService.create(roomClient);
        setMensajes(messagesRoom);
      } catch (error) {
        console.log("Error al unir cliente a sala:", error);
      }
    };

    handleRoomClient();
  }, [salaSeleccionada, client]);

  useEffect(() => {
    messageService.connect(() => {
      if (salaSeleccionada) {
        messageService.subscribeToRoom(salaSeleccionada, (nuevoMensaje) => {
          setMensajes((prev) => [...prev, nuevoMensaje]);
        });
      }
    });
  }, [salaSeleccionada]);

  const handleEnviarMensaje = () => {
    if (!mensaje.trim() || !salaSeleccionada || !client) {
      toast.error("Algo ocurrio!, intentalo de nuevo");
      return;
    }

    const nuevoMensaje = {
      text: mensaje,
      senderClient: client,
      room: { id: salaSeleccionada },
    } as IMessage;

    messageService.sendMessage(nuevoMensaje);
    setMensaje("");
  };

  const handleLogout = () => {
    signinService.logOut();
    router.push("/auth/signin");
    toast.success("Cerraste sesión correctamente!");
  };

  return (
    <div className="flex bg-gray-100 relative min-h-screen ml-60">
      {/* Botón fijo de cerrar sesión en la esquina superior derecha */}
      <div className="absolute top-2 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-xs text-red-500">Cerrar sesión</span>
        </Button>
      </div>

      {/* Sidebar - Lista de Salas */}
      <div className="w-60 bg-gray-800 text-white flex flex-col fixed top-0 left-0 h-screen z-40">
        {/* Header del servidor */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold text-white">TertuliAndo</h2>
          <p className="text-xs text-gray-400">Chat en linea</p>
        </div>

        {/* Lista de salas */}
        <ScrollArea className="flex-1 px-2 ">
          <div className="space-y-1 py-2 ">
            {rooms.length > 0 ? (
              rooms.map((sala) => {
                return (
                  <button
                    key={sala.id}
                    onClick={() => setSalaSeleccionada(sala.id ?? 0)}
                    className={`cursor-pointer w-full flex items-center gap-2 px-2 py-1.5 rounded text-left hover:bg-gray-700 transition-colors ${
                      salaSeleccionada === sala.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {sala.icono && (
                      <img
                        src={sala.icono}
                        alt="icono"
                        className="h-4 w-4 object-contain"
                      />
                    )}
                    <span className="flex-1 text-sm">{sala.name}</span>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No hay salas disponibles</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Botón agregar sala */}
        <div className="p-3 border-t border-gray-700">
          <Button
            onClick={() => setOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Sala
          </Button>
        </div>

        {/* Usuario actual */}
        <div className="p-3 bg-gray-900 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-600 text-white text-xs">
              {client?.name?.trim().charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {client?.name}
            </p>
            <p className="text-xs text-gray-400">En línea</p>
          </div>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col ">
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
          <>
            <div className="flex flex-col h-screen">
              {/* Header del chat */}
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-gray-500" />
                  <h1 className="font-semibold text-gray-900">
                    {salaActual?.name}
                  </h1>
                  <Separator orientation="vertical" className="h-6" />
                </div>
              </div>

              {/* Área de mensajes */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-4 py-6 bg-gray-50">
                  <div className=" ">
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
                                    {msg.senderClient?.name
                                      ?.charAt(0)
                                      .toUpperCase() ?? "?"}
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
                                    ? new Date(msg.sentAt).toLocaleTimeString(
                                        "es-CO",
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        }
                                      )
                                    : "Ahora"}
                                </span>
                              </div>

                              {esMio && (
                                <Avatar className="h-9 w-9">
                                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                                    {client?.name?.charAt(0).toUpperCase() ??
                                      "?"}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // Estado: No hay mensajes en la sala
                      <div className="flex flex-col items-center justify-center h-full py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Coffee className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          ¡Qué silencio por aquí!
                        </h3>
                        <p className="text-gray-600 text-center max-w-sm">
                          Sé el primero en enviar un mensaje en #
                          {salaActual?.name}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Input para escribir mensajes */}
              <div className="bg-white border-gray-200 p-6 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEnviarMensaje();
                        }
                      }}
                      placeholder={`Mensaje #${salaActual?.name}`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 cursor-pointer"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleEnviarMensaje}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    disabled={!mensaje.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <RoomForm
        open={open}
        setOpen={setOpen}
        onRoomCreated={(newRoom) => setRooms((prev) => [...prev, newRoom])}
      />
    </div>
  );
}
