import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/images/VGU-Logo.svg";
import { STORAGE } from "../utils/configs/storage";
import { refreshToken } from "../services/authService";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const checkLogin = async () => {
      let token = sessionStorage.getItem(STORAGE.PIT_TOKEN) as string;
      if (token)
        setIsAuthenticated(true)
      else {
        let rfToken = Cookies.get(STORAGE.PIT_REFRESH_TOKEN);
        if (rfToken) {
          let newToken = await refreshToken();
          if (newToken) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkLogin();
  }, [sessionStorage.getItem(STORAGE.PIT_TOKEN)]);

  return (
    <nav className="flex items-center justify-between py-5">
      <img
        src={logo}
        className="w-[180px]"
        alt="the logo image"
      />

      <div className="flex items-center justify-between">
        {/* Login button */}
        {isAuthenticated ? (
          <Link to={"/record"} >
            <button
              type="button"
              className="py-2 px-4 bg-blue text-center
         text-white hover:opacity-70 rounded-full shadow-xl shadow-light-blue"
            >
              Dashboard
            </button>
          </Link>
        ) : (
          <Link to={"/login"} >
            <button
              type="button"
              className="py-2 px-4 bg-blue text-center
         text-white hover:opacity-70 rounded-full shadow-xl shadow-light-blue"
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
