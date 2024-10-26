import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import login from "./Login";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import FullLayout from "./layout/FullLayout";

import Dashboard from './pages/Dashboard';

import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import ProcessingOrders from './pages/ProcessingOrders';
import PendingOrders from './pages/PendingOrders';
import TrainTrips from './pages/TrainTrips';
import SelectSchedule from './pages/SelectSchedule';
import ScheduleHistory from './pages/ScheduleHistory';
import ProductsByCategory from './pages/AddProducts';
import AddDriver from './pages/AddDriver';
import AddDriverAssistant from './pages/AddDriverAssistant';
import ProfilePage from "./pages/Profile";
import WorkingHours from "./pages/WorkingHours";
import TrucksWorkingHours from "./pages/TrucksWorkingHours";


export default function AppRoutes() {
  const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    async function fetchLoginInfo() {
      const info = await login();
      setLoginInfo(info);
    }
    fetchLoginInfo();
  }, []);

  if (!loginInfo) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  } else if (loginInfo && !loginInfo.success) {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<SignIn />} /> {/* Catch-all route */}
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          {/* Routes using FullLayout */}
          <Route element={<FullLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reports" element={<Reports />} />
            {loginInfo.role === "admin" && (
              <>
                <Route path="/orders" element={<PendingOrders />} />
                {/* Nested layout for orders routes */}
                <Route path="/orders">
                  <Route path="traintrips" element={<TrainTrips />} />
                </Route>
                <Route path="/products" element={<ProductsByCategory />} />
              </>
            )}
            {loginInfo.role === "manager" && (
              <>
                <Route path="/orders" element={<ProcessingOrders />} />
                {/* Nested layout for orders routes */}
                <Route path="/orders">
                  <Route path="truck-schedules" element={<SelectSchedule />} />
                </Route>
                <Route path="/addDriver" element={<AddDriver />} />
                <Route path="/addAssistant" element={<AddDriverAssistant />} />
                <Route path="/viewWorkingHours" element={<WorkingHours />} />
                <Route path="/schedule-history" element={<ScheduleHistory />} />
                <Route path="/trucksWorkingHours" element={<TrucksWorkingHours />} />
              </>
            )}
          </Route>
          {/* Routes without FullLayout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </Router>
    );
  }
}
