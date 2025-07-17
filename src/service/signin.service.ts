import iAxios from "@/lib/axios-instance-utils";
import { utils } from "@/lib/utils";
import { ILoginRequest } from "@/types/ILoginRequest";
import { IClient } from "@/types/client-interface";

class SigninService {
  private readonly url: string;

  constructor() {
    this.url = `${utils.baseUrl}/auth`;
  }

  async logIn(values: ILoginRequest): Promise<IClient> {
    const res = await iAxios.post<IClient>(`${this.url}`, values);
    return res.data;
  }
}

export const signinService = new SigninService();
