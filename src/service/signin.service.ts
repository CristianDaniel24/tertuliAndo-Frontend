import { cookieUtils } from "@/app/utils/cookies.utils";
import iAxios from "@/lib/axios-instance-utils";
import { utils } from "@/lib/utils";
import { ILoginRequest } from "@/types/ILoginRequest";
import { IAuthResponse } from "@/types/auth-response-interface";

class SigninService {
  private readonly url: string;

  constructor() {
    this.url = `${utils.baseUrl}/auth`;
  }

  async logIn(values: ILoginRequest) {
    const res = await iAxios.post<IAuthResponse>(`${this.url}`, values);

    this.createSession(res.data);

    return res.data;
  }

  private createSession(client: IAuthResponse) {
    cookieUtils.setCookie({
      name: "session",
      value: JSON.stringify(client),
      days: 1,
    });
  }

  logOut() {
    cookieUtils.deleteCookie("session");
  }
}

export const signinService = new SigninService();
