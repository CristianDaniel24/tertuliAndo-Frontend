import iAxios from "@/lib/axios-instance-utils";
import { utils } from "@/lib/utils";

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

  async create(data: T): Promise<T> {
    const res = await iAxios.post<T>(this.url, data);
    return res.data;
  }
}
