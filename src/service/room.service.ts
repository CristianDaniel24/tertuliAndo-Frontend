import iAxios from "@/lib/axios-instance-utils";
import { GenericService } from "./generic.service";
import { IMessage } from "@/types/message-interface";

class RoomService extends GenericService<IRoom> {
  constructor() {
    super({ endpoint: "room" });
  }

  async createRoom(data: IRoom): Promise<IRoom[]> {
    const res = await iAxios.post<IRoom[]>(this.url, data);
    return res.data;
  }
}

export const roomService = new RoomService();
