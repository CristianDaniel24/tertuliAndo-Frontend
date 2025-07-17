import axios from "axios";
import { utils } from "./utils";
import { toast } from "sonner";
import { IErrorResponse } from "@/types/errorResponseInterface";

const iAxios = axios.create({ baseURL: utils.baseUrl });

iAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response ? error.response.status : null;

    const data = error.response?.data as IErrorResponse;
    let message = data?.message;

    if (!message) {
      switch (statusCode) {
        case 400:
          message = "Solicitud incorrecta, verifica los datos.";
          break;
        case 404:
          message = "Recurso no encontrado.";
          break;
        case 401:
          message = "No estas autorizado, verifica tus credenciales.";
          break;
        case 500:
          message = "Error interno del servidor, intentalo mas tarde.";
          break;
        default:
          message = "Algo salio mal, intentalo nuevamente.";
      }
    }

    toast.error(message);
    return Promise.reject(new Error(error));
  }
);

export default iAxios;
