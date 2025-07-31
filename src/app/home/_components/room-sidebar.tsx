"use client";

import { MessageCircle } from "lucide-react";

interface IRoomSidebar {
  rooms: IRoom[];
  salaSeleccionada: number | null;
  setSalaSeleccionada: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function RoomSidebar({
  rooms,
  salaSeleccionada,
  setSalaSeleccionada,
}: Readonly<IRoomSidebar>) {
  return (
    <>
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
    </>
  );
}
