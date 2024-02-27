import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, type FC, type FormEvent } from "react";
import { Link, type NavigateFunction, useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import Cookies from "js-cookie";

import logo from "../assets/images/VGU-Logo.svg";
import { login } from "../services/authService";
import { APPLICATION_URL } from "../utils/configs/routes/applicationUrl";
import { STORAGE } from "../utils/configs/storage";
import { NOTIFY } from "../utils/configs/notify";

const LogInPage: FC = function () {
  const navigate: NavigateFunction = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loading.hourglass();
    try {
      const response = await login(username, password);
      if (response.token) {
        const token = response.token;
        const role = response.role ?? ""; // Use nullish coalescing operator to provide a default value of an empty string
        sessionStorage.setItem(STORAGE.PIT_TOKEN, token);
        sessionStorage.setItem(STORAGE.PIT_ROLE, role);
        if (isRememberMe) {
          Cookies.set(STORAGE.PIT_TOKEN, token, { expires: 30 });
          Cookies.set(STORAGE.PIT_ROLE, role, { expires: 30 });
        }
        navigate(APPLICATION_URL.HOME_URL);
        Loading.remove();
      } else {
        Notify.failure(NOTIFY.SERVER_ERROR);
        Loading.remove();
      }
    } catch (e) {
      Notify.failure(NOTIFY.SERVER_ERROR);
      Loading.remove();
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <Link to={"/"}>
          <img alt="VGU logo" src={logo} className="mr-3 h-12" />
        </Link>
      </div>
      <Card
        horizontal
        className="w-full md:max-w-screen-sm md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in
        </h1>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Username</Label>
            <TextInput
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox
                id="rememberMe"
                checked={isRememberMe}
                onChange={() => setIsRememberMe((prev) => !prev)}
                name="rememberMe"
              />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Forget password?
            </a>
          </div>
          <div className="mb-6">
            <Button
              type="submit"
              className="w-full bg-primary-600 hover:opacity-70 lg:w-auto"
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LogInPage;
