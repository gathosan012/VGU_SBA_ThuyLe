/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, type FC, FormEvent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Cookies from "js-cookie";

import logo from "../assets/images/VGU-Logo.svg";
import { login } from '../services/authService';
import { APPLICATION_URL } from "../utils/configs/routes/applicationUrl";
import { STORAGE } from "../utils/configs/storage";
import { NOTIFY } from "../utils/configs/notify";
import { RES_CODE } from "../utils/configs/statusCode";

const LogInPage: FC = function () {
    let navigate: NavigateFunction = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRememberMe, setIsRememberMe] = useState<boolean>(false)

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Loading.hourglass();
        try {
            const response = await login(username, password);
            if (response.resCode === RES_CODE.OK) {
                let user = response.payload.user;
                let token = response.payload.accessToken;
                let refreshToken = response.payload.refreshToken
                sessionStorage.setItem(STORAGE.PIT_TOKEN, token);
                sessionStorage.setItem(STORAGE.PIT_USER, JSON.stringify(user));
                if (isRememberMe) {
                    Cookies.set(STORAGE.PIT_REFRESH_TOKEN, refreshToken, { expires: 30 });
                    Cookies.set(STORAGE.PIT_TOKEN, token, { expires: 30 });
                    Cookies.set(STORAGE.PIT_USER, JSON.stringify(user), { expires: 30 });
                }
                navigate(APPLICATION_URL.RECORD_URL);
                Loading.remove();
            }
            else {
                Notify.failure(response.resMsg || response.resMsg.message);
                Loading.remove();
            }
        } catch (e) {
            Notify.failure(NOTIFY.SERVER_ERROR);
            Loading.remove();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 h-screen">
            <div className="my-6 flex items-center gap-x-1 lg:my-0">
                <Link to={"/"} >
                    <img
                        alt="VGU logo"
                        src={logo}
                        className="mr-3 h-12"
                    />
                </Link>
            </div>
            <Card
                horizontal
                className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
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
                            <Checkbox id="rememberMe"
                                checked={isRememberMe}
                                onChange={() => setIsRememberMe(prev => !prev)}
                                name="rememberMe" />
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
                        <Button type="submit" className="w-full lg:w-auto bg-primary-600 hover:opacity-70">
                            Login
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LogInPage;
