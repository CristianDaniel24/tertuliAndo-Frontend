"use client";

import { Button } from "@/components/ui/button";
import { Smile, Send, LogOut } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { roomService } from "@/service/room.service";
import RoomForm from "./_components/room-form";
import { Input } from "@/components/ui/input";
import { signinService } from "@/service/signin.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sessionUtils } from "../utils/session.utils";
import { roomClientService } from "@/service/room-client.service";
import { IRoomClient } from "@/types/room-client-interface";
import { messageService } from "@/service/message.service";
import { IMessage } from "@/types/message-interface";
import Sidebar from "./_components/sidebar";
import ChatArea from "./_components/chat-area";

export default function SalasPage() {
  const [salaSeleccionada, setSalaSeleccionada] = useState<number | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [client, setClient] = useState<any>(null);
  const salaActual = rooms.find((sala) => sala.id === salaSeleccionada);
  const [mensajes, setMensajes] = useState<IMessage[]>([]);
  const mensajesEndRef = useRef<HTMLDivElement | null>(null);
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
        const messagesRoom = await roomClientService.createRoomClient(
          roomClient
        );
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

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

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

  const scrollToBottom = () => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Sidebar fijo a la izquierda */}
      <div className="w-60 bg-gray-800 text-white flex flex-col fixed top-0 left-0 h-screen z-40">
        {/* Header del servidor */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold text-white">TertuliAndo</h2>
          <p className="text-xs text-gray-400">Chat en linea</p>
        </div>
        <Sidebar
          rooms={rooms}
          setRooms={setRooms}
          salaSeleccionada={salaSeleccionada}
          setSalaSeleccionada={setSalaSeleccionada}
          open={open}
          setOpen={setOpen}
          client={client}
          setClient={setClient}
        />
      </div>

      {/* Contenedor principal desplazado por el sidebar */}
      <div className="flex flex-col bg-gray-100 min-h-screen ml-60 relative">
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

        {/* Área principal del chat */}
        <ChatArea
          rooms={rooms}
          setRooms={setRooms}
          open={open}
          setOpen={setOpen}
          salaSeleccionada={salaSeleccionada}
          setSalaSeleccionada={setSalaSeleccionada}
          salaActual={salaActual}
          mensajes={mensajes}
          setMensajes={setMensajes}
          client={client}
          mensajesEndRef={mensajesEndRef}
        />

        {/* Input para escribir mensajes */}
        <div className="bg-white border-gray-200 p-3 shrink-0">
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

        {/* Modal para crear sala */}
        <RoomForm
          open={open}
          setOpen={setOpen}
          onRoomCreated={(newRoom) => setRooms((prev) => [...prev, newRoom])}
        />
      </div>
    </div>
  );
}
