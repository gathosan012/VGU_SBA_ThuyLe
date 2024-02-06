// import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

// import type { LoginResponse, HttpResponse } from "../models/httpResponse";
import type { LoginResponse } from "../models/httpResponse";
import * as httpRequest from "../utils/httpRequest";
import { STORAGE } from "../utils/configs/storage";
// import { RES_CODE } from "../utils/configs/statusCode";

export const login = async (username: string, password: string) => {
  const res: LoginResponse = await httpRequest.post("auth/login", {
    username,
    password,
  });
  return res;
};

export const logout = () => {
  sessionStorage.removeItem(STORAGE.PIT_TOKEN);
  // sessionStorage.removeItem(STORAGE.PIT_USER);
  sessionStorage.removeItem(STORAGE.PIT_ROLE); // update

  // Cookies.remove(STORAGE.PIT_REFRESH_TOKEN);
  Cookies.remove(STORAGE.PIT_TOKEN);

  // Cookies.remove(STORAGE.PIT_USER); // update
  Cookies.remove(STORAGE.PIT_ROLE);
};

/* export const logout = () => {
  return false;
}; */

/* export const refreshToken = async () => {
  let token = Cookies.get(STORAGE.PIT_REFRESH_TOKEN);
  let rfToken = Cookies.get(STORAGE.PIT_TOKEN);
  const res: HttpResponse = await httpRequest.post(
    "auth/refresh",
    { refreshToken: token },
    {
      headers: { authorization: rfToken },
    }
  );
  if (res.resCode === RES_CODE.OK) {
    let user = Cookies.get(STORAGE.PIT_USER);
    sessionStorage.setItem(STORAGE.PIT_TOKEN, res.payload.accessToken);
    sessionStorage.setItem(STORAGE.PIT_USER, user as string);
    return res.payload.accessToken;
  } else {
    return redirect("/login");
  }
}; */

/* export const refreshToken = () => {
  return false;
}; */

export const isLogin = () => {
  const token = sessionStorage.getItem(STORAGE.PIT_TOKEN)!;
  // let token = localStorage.getItem(STORAGE.PIT_TOKEN) as string;
  if (token) return true;
  else {
    // let rfToken = Cookies.get(STORAGE.PIT_REFRESH_TOKEN);
    const token = Cookies.get(STORAGE.PIT_TOKEN);
    /* if (rfToken && token) {
      refreshToken();
      return true;
    } else return false; */
    if (token) {
      return true;
    } else return false;
  }
};

/* export const isLogin = () => {
  return false; // Always return false to disable login functionality
};
 */
