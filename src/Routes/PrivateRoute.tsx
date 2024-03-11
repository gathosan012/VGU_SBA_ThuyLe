import { type FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { APPLICATION_URL } from "../utils/configs/routes/applicationUrl";
import { isLogin } from "../services/authService";

type Props = {
  redirectPath?: string;
};

export const PrivateRoutes: FC<Props> = ({
  redirectPath = APPLICATION_URL.LOGIN_URL,
}) => {
  const isAuthenticated = isLogin();

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};
