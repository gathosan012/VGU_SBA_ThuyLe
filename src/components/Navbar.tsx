import {  useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/VGU-Logo.svg";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  return (
    <nav className="flex items-center justify-between py-5">
      <img src={logo} className="w-[180px]" alt="the_logo_image" />

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
