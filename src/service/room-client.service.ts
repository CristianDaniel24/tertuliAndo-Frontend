import { IRoomClient } from "@/types/room-client-interface";
import { GenericService } from "./generic.service";

class RoomClient extends GenericService<IRoomClient> {
  constructor() {
    super({ endpoint: "roomClient" });
  }
}
export const roomClientService = new RoomClient();
