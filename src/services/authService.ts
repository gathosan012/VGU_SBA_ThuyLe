import Cookies from "js-cookie";
import type { LoginResponse } from "../models/httpResponse";
import * as httpRequest from "../utils/httpRequest";
import { STORAGE } from "../utils/configs/storage";

export const login = async (username: string, password: string) => {
  const res: LoginResponse = await httpRequest.post("auth/login", {
    username,
    password,
  });
  return { data: res, status: 200 };
};


export const logout = () => {
  sessionStorage.removeItem(STORAGE.SBA_TOKEN);
  sessionStorage.removeItem(STORAGE.SBA_ROLE);
  sessionStorage.removeItem(STORAGE.SBA_USERID);

  Cookies.remove(STORAGE.SBA_TOKEN);
  Cookies.remove(STORAGE.SBA_ROLE);
  Cookies.remove(STORAGE.SBA_USERID);
};


export const isLogin = () => {
  const token = sessionStorage.getItem(STORAGE.SBA_TOKEN)!;
  if (token) return true;
  else {
    const token = Cookies.get(STORAGE.SBA_TOKEN)
    if (token) {
      return true;
    } else return false;
  }
};
