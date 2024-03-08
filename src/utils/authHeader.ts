import { STORAGE } from "./configs/storage";

export default function authHeader() {
  const userToken = sessionStorage.getItem(STORAGE.PIT_TOKEN)!;

  if (userToken)
    return {
      authorization: `Bearer ${userToken}`,
    };
  else {
    return {
      authorization: null,
    };
  }
}
