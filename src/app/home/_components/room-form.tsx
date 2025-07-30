"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { roomService } from "@/service/room.service";
import { toast } from "sonner";
import { useState } from "react";

interface RoomFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRoomCreated: (newRoom: IRoom) => void;
}

export default function RoomForm({
  open,
  setOpen,
  onRoomCreated,
}: RoomFormProps) {
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = async () => {
    if (newRoom.trim() === "") {
      toast.error("El nombre de la sala es obligatorio");
      return;
    }

    try {
      const created = await roomService.createRoom({ name: newRoom });
      onRoomCreated(created);
      toast.success("Sala creada exitosamente");
      setNewRoom("");
      setOpen(false);
    } catch (error) {
      console.error("Error al crear la sala:", error);
      toast.error("No se pudo crear la sala");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva sala</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="col-span-3"
              placeholder="Ej: Sala A"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCreateRoom} className="cursor-pointer">
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
