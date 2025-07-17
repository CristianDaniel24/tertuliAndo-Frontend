import { IClient } from "@/types/client-interface";
import { GenericService } from "./generic.service";

class ClientService extends GenericService<IClient> {
  constructor() {
    super({ endpoint: "client" });
  }
}
export const clientService = new ClientService();
