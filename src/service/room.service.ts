import { GenericService } from "./generic.service";

class RoomService extends GenericService<IRoom> {
  constructor() {
    super({ endpoint: "room" });
  }
}

export const roomService = new RoomService();
