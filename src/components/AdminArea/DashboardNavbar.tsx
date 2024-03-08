import { Navbar } from "flowbite-react";
import type { FC } from "react";

import logo from "../../assets/images/VGU-Logo.svg";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router";
import { APPLICATION_URL } from "../../utils/configs/routes/applicationUrl";

const DashboardNavbar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(APPLICATION_URL.LOGIN_URL);
  };

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="VGU" src={logo} className="mr-3 w-[10rem]" />
              {/* <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                VGU
              </span> */}
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            {/* <DarkThemeToggle /> */}
            {/* Logout button */}
            <button
              type="button"
              className="rounded-full bg-primary-600 px-4 py-2 text-center
                      text-white hover:opacity-70"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
