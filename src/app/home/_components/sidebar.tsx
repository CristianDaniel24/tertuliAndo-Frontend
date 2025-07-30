"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IClient } from "@/types/client-interface";
import { MessageCircle, Plus } from "lucide-react";

interface ISidebar {
  rooms: IRoom[];
  setRooms: React.Dispatch<React.SetStateAction<IRoom[]>>;
  salaSeleccionada: number | null;
  setSalaSeleccionada: React.Dispatch<React.SetStateAction<number | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  client: IClient;
  setClient: React.Dispatch<React.SetStateAction<IClient>>;
}

export default function Sidebar({
  rooms,
  setRooms,
  salaSeleccionada,
  setSalaSeleccionada,
  open,
  setOpen,
  client,
  setClient,
}: Readonly<ISidebar>) {
  return (
    <>
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
    </>
  );
}
