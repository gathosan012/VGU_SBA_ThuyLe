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
  sessionStorage.removeItem(STORAGE.PIT_TOKEN);
  sessionStorage.removeItem(STORAGE.PIT_ROLE); 

  Cookies.remove(STORAGE.PIT_TOKEN);
  Cookies.remove(STORAGE.PIT_ROLE);
};


export const isLogin = () => {
  const token = sessionStorage.getItem(STORAGE.PIT_TOKEN)!;
  if (token) return true;
  else {
    const token = Cookies.get(STORAGE.PIT_TOKEN)
    if (token) {
      return true;
    } else return false;
  }
};
