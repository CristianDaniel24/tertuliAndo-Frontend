import { IRoomClient } from "@/types/room-client-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance-utils";
import { IMessage } from "@/types/message-interface";

class RoomClient extends GenericService<IRoomClient> {
  constructor() {
    super({ endpoint: "roomClient" });
  }

  async createRoomClient(data: IRoomClient): Promise<IMessage[]> {
    const res = await iAxios.post<IMessage[]>(this.url, data);
    return res.data;
  }
}
export const roomClientService = new RoomClient();
