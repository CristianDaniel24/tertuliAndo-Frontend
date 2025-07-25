import iAxios from "@/lib/axios-instance-utils";
import { utils } from "@/lib/utils";
import { IMessage } from "@/types/message-interface";

export class GenericService<T> {
  protected readonly url: string;

  constructor({ endpoint }: { endpoint: string }) {
    this.url = `${utils.baseUrl}/${endpoint}`;
  }

  async getAll(): Promise<T[]> {
    const res = await iAxios.get<T[]>(this.url);
    return res.data;
  }

  async findById(id: number): Promise<T | undefined> {
    const res = await iAxios.get<T>(`${this.url}/${id}`);
    return res.data;
  }

  async create(data: T): Promise<IMessage[]> {
    const res = await iAxios.post<IMessage[]>(this.url, data);
    return res.data;
  }
}
