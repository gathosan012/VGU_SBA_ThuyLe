import { createRoot } from "react-dom/client";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import MainPage from "./pages/Main";
import "./index.css";
import LogInPage from "./pages/Login";
import RecordPage from "./pages/AdminArea/Record";
import { PrivateRoutes } from "./Routes/PrivateRoute";
import { APPLICATION_URL } from "./utils/configs/routes/applicationUrl";
import HomePage from "./pages/UserArea/Home/Home";
import PaymentPage from "./pages/UserArea/Payment/Payment";
import SchedulePage from "./pages/UserArea/Schedule/Schedule";
import HistoryPage from "./pages/UserArea/History/History";
import TicketDetailsPage from "./pages/UserArea/TicketDetails/TicketDetails";
import MANAGE_SchedulePage from "./pages/AdminArea/Schedule";
// import DashboardPage from "./pages/AdminArea/Dashboard";

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
          element={<PrivateRoutes redirectPath={APPLICATION_URL.LOGIN_URL} />}
        >
          <Route path={APPLICATION_URL.RECORD_URL} element={<RecordPage />} />

          <Route path={APPLICATION_URL.HOME_URL} element={<HomePage />} />
          <Route path={APPLICATION_URL.PAYMENT_URL} element={<PaymentPage />} />
          <Route path={APPLICATION_URL.SCHEDULE_URL} element={<SchedulePage />} />
          <Route path={APPLICATION_URL.HISTORY_URL} element={<HistoryPage />} />
          <Route path={APPLICATION_URL.TICKETDETAILS_URL} element={<TicketDetailsPage />} />
          <Route path={APPLICATION_URL.MANAGE_SCHEDULE_URL} element={<MANAGE_SchedulePage />} />

          {/* Add more router here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Flowbite>

)
