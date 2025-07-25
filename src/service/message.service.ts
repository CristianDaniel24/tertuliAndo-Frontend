import SockJS from "sockjs-client";
import { CompatClient, Stomp, Message } from "@stomp/stompjs";
import { IMessage } from "@/types/message-interface";

class MessageService {
  private stompClient: CompatClient | null = null;

  connect(callback: () => void): void {
    const socket = new SockJS("http://localhost:8080/chat");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log("Conectado al WebSocket");
      callback();
    });
  }

  sendMessage(message: IMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        `/app/chat.send/${message.room.id}`,
        {},
        JSON.stringify(message)
      );
    }
  }

  subscribeToRoom(roomId: number, callback: (message: IMessage) => void): void {
    if (!this.stompClient?.connected) return;

    this.stompClient.subscribe(`/topic/public/${roomId}`, (msg: Message) => {
      const parsedMessage: IMessage = JSON.parse(msg.body);
      callback(parsedMessage);
    });
  }
}

export const messageService = new MessageService();
