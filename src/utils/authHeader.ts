import { STORAGE } from "./configs/storage";

export default function authHeader() {
  const userToken = sessionStorage.getItem(STORAGE.PIT_TOKEN)!;

  /* const userToken = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwNjY3MDkzMywiZXhwIjoxNzA2NzU3MzMzfQ.RdMsrNJr5UoUaRzpXvCeIE4QDoWL5figFBnuDvZJp70ayMoV74T75X9GMrWyZyDn";
  localStorage.setItem("authToken", userToken); */

  if (userToken)
    return {
      authorization: userToken,
    };
  else {
    return {
      authorization: null,
    };
  }
}
