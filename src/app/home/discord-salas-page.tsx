"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Hash,
  Send,
  Smile,
  Paperclip,
  Settings,
  Users,
  MessageCircle,
  Coffee,
} from "lucide-react";

// Datos de ejemplo
const salasEjemplo = [
  {
    id: 1,
    nombre: "sala-general",
    tipo: "texto",
    icono: Hash,
    activa: true,
    mensajesNoLeidos: 3,
  },
  {
    id: 2,
    nombre: "anuncios",
    tipo: "texto",
    icono: Hash,
    activa: false,
    mensajesNoLeidos: 0,
  },
  {
    id: 3,
    nombre: "desarrollo",
    tipo: "texto",
    icono: Hash,
    activa: false,
    mensajesNoLeidos: 12,
  },
  {
    id: 4,
    nombre: "diseño",
    tipo: "texto",
    icono: Hash,
    activa: false,
    mensajesNoLeidos: 0,
  },
  {
    id: 5,
    nombre: "random",
    tipo: "texto",
    icono: Hash,
    activa: false,
    mensajesNoLeidos: 1,
  },
];

const mensajesEjemplo = [
  {
    id: 1,
    usuario: "Juan Pérez",
    avatar: "/placeholder.svg?height=40&width=40",
    mensaje: "¡Hola a todos! ¿Cómo están?",
    timestamp: "Hoy a las 10:30 AM",
    iniciales: "JP",
  },
  {
    id: 2,
    usuario: "María García",
    avatar: "/placeholder.svg?height=40&width=40",
    mensaje: "Todo bien por aquí, trabajando en el nuevo proyecto",
    timestamp: "Hoy a las 10:32 AM",
    iniciales: "MG",
  },
  {
    id: 3,
    usuario: "Carlos López",
    avatar: "/placeholder.svg?height=40&width=40",
    mensaje: "¿Alguien puede revisar el PR que subí ayer?",
    timestamp: "Hoy a las 10:35 AM",
    iniciales: "CL",
  },
  {
    id: 4,
    usuario: "Ana Martínez",
    avatar: "/placeholder.svg?height=40&width=40",
    mensaje: "Ya lo revisé, se ve bien! 👍",
    timestamp: "Hoy a las 10:37 AM",
    iniciales: "AM",
  },
  {
    id: 5,
    usuario: "Juan Pérez",
    avatar: "/placeholder.svg?height=40&width=40",
    mensaje: "Perfecto, entonces lo mergeo en la tarde",
    timestamp: "Hoy a las 10:40 AM",
    iniciales: "JP",
  },
];

export default function DiscordChatPage() {
  const [salaSeleccionada, setSalaSeleccionada] = useState<number | null>(1);
  const [mensaje, setMensaje] = useState("");

  const salaActual = salasEjemplo.find((sala) => sala.id === salaSeleccionada);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Lista de Salas */}
      <div className="w-60 bg-gray-800 text-white flex flex-col">
        {/* Header del servidor */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold text-white">Mi Workspace</h2>
          <p className="text-xs text-gray-400">Salas de chat</p>
        </div>

        {/* Lista de salas */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 py-2">
            {salasEjemplo.length > 0 ? (
              salasEjemplo.map((sala) => {
                const IconoSala = sala.icono;
                return (
                  <button
                    key={sala.id}
                    onClick={() => setSalaSeleccionada(sala.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left hover:bg-gray-700 transition-colors ${
                      salaSeleccionada === sala.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    <IconoSala className="h-4 w-4" />
                    <span className="flex-1 text-sm">{sala.nombre}</span>
                    {sala.mensajesNoLeidos > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                        {sala.mensajesNoLeidos > 99
                          ? "99+"
                          : sala.mensajesNoLeidos}
                      </Badge>
                    )}
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
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Sala
          </Button>
        </div>

        {/* Usuario actual */}
        <div className="p-3 bg-gray-900 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-600 text-white text-xs">
              TU
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Tu Usuario
            </p>
            <p className="text-xs text-gray-400">En línea</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white p-1"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {salasEjemplo.length === 0 ? (
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
                Crea tu primera sala para comenzar a chatear con tu equipo
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
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
            {/* Header del chat */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-gray-500" />
                <h1 className="font-semibold text-gray-900">
                  {salaActual?.nombre}
                </h1>
                <Separator orientation="vertical" className="h-6" />
                <p className="text-sm text-gray-500">Sala de chat del equipo</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Área de mensajes */}
            <ScrollArea className="flex-1 bg-white">
              <div className="p-4">
                {mensajesEjemplo.length > 0 ? (
                  <div className="space-y-4">
                    {mensajesEjemplo.map((msg) => (
                      <div
                        key={msg.id}
                        className="flex gap-3 hover:bg-gray-50 p-2 rounded"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {msg.iniciales}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {msg.usuario}
                            </span>
                            <span className="text-xs text-gray-500">
                              {msg.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {msg.mensaje}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Estado: No hay mensajes en la sala */
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Coffee className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      ¡Qué silencio por aquí!
                    </h3>
                    <p className="text-gray-600 text-center max-w-sm">
                      Sé el primero en enviar un mensaje en #
                      {salaActual?.nombre}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input para escribir mensajes */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder={`Mensaje #${salaActual?.nombre}`}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="pr-20"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        // Aquí iría la lógica para enviar el mensaje
                        setMensaje("");
                      }
                    }}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!mensaje.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
