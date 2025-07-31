"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IClient } from "@/types/client-interface";
import { Plus } from "lucide-react";
import RoomSidebar from "./room-sidebar";

interface ISidebar {
  rooms: IRoom[];
  salaSeleccionada: number | null;
  setSalaSeleccionada: React.Dispatch<React.SetStateAction<number | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  client: IClient;
}

export default function Sidebar({
  rooms,
  salaSeleccionada,
  setSalaSeleccionada,
  setOpen,
  client,
}: Readonly<ISidebar>) {
  return (
    <>
      <ScrollArea className="flex-1 px-2 ">
        <div className="space-y-1 py-2 ">
          <RoomSidebar
            rooms={rooms}
            salaSeleccionada={salaSeleccionada}
            setSalaSeleccionada={setSalaSeleccionada}
          />
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
