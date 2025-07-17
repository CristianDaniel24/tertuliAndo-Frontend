import { IClient } from "@/types/client-interface";
import { cookieUtils } from "./cookies.utils";

class SessionUtils {
  getPersonFromSession(): IClient {
    const cookie = cookieUtils.getCookie("session");

    if (!cookie) return {} as IClient;

    try {
      const parsed = JSON.parse(cookie);
      return parsed.person as IClient;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      return {} as IClient;
    }
  }
}

export const sessionUtils = new SessionUtils();
