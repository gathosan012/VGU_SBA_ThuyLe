import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import MainPage from "./pages/Main";
import "./index.css";
import LogInPage from "./pages/Login";
import RecordPage from "./pages/AdminArea/Record";
import { PrivateRoutes } from "./components/Routes/PrivateRoute";
import { APPLICATION_URL } from "./utils/configs/routes/applicationUrl";
import Schedule from "./pages/AdminArea/Schedule";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  // <StrictMode>
  <Flowbite theme={{ theme }}>
    <BrowserRouter>
      <Routes>
        <Route path={APPLICATION_URL.MAINPAGE_URL} element={<MainPage />} />
        <Route path={APPLICATION_URL.LOGIN_URL} element={<LogInPage />} />
        <Route
        // element={<PrivateRoutes redirectPath={APPLICATION_URL.LOGIN_URL} />}
        >
          <Route path={APPLICATION_URL.SCHEDULE_URL} element={<Schedule />} />
          <Route path={APPLICATION_URL.RECORD_URL} element={<RecordPage />} />
          {/* Add more router here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Flowbite>
  // </StrictMode>
);
