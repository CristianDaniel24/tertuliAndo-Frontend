import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { IClient } from "./client-interface";

export interface IMessage {
  id?: number;
  text: string;
  sentAt?: string | Timestamp;
  senderClient: IClient;
  room: IRoom;
}
