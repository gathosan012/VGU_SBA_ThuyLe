import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/images/VGU-Logo.svg";
import { STORAGE } from "../utils/configs/storage";
import { refreshToken } from "../services/authService";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /*   useEffect(() => {
    const checkLogin = async () => {
      const token = sessionStorage.getItem(STORAGE.PIT_TOKEN) as string;
      if (token) setIsAuthenticated(true);
      else {
        const rfToken = Cookies.get(STORAGE.PIT_REFRESH_TOKEN);
        if (rfToken) {
          const newToken = await refreshToken();
          if (newToken) {
            // setIsAuthenticated(true);
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkLogin();
  }, [sessionStorage.getItem(STORAGE.PIT_TOKEN)]); */

  return (
    <nav className="flex items-center justify-between py-5">
      <img src={logo} className="w-[180px]" alt="the logo image" />

      <div className="flex items-center justify-between">
        {/* Login button */}
        {isAuthenticated ? (
          <>
            <Link to={"/record"}>
              <button
                type="button"
                className="rounded-full bg-blue px-4 py-2 text-center text-white shadow-xl shadow-light-blue hover:opacity-70"
              >
                Dashboard
              </button>
            </Link>
            <Link to={"/schedule"}>
              <button
                type="button"
                className="rounded-full bg-blue px-4 py-2 text-center text-white shadow-xl shadow-light-blue hover:opacity-70"
              >
                Schedule
              </button>
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <button
              type="button"
              className="rounded-full bg-blue px-4 py-2 text-center text-white shadow-xl shadow-light-blue hover:opacity-70"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
