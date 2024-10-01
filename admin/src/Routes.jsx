import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import login from './Login';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

import FullLayout from './layout/FullLayout';

import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PendingOrders from './pages/PendingOrders';
import TrainTrips from './pages/TrainTrips';
import Roadways from './pages/Roadways';
import SelectResource from './pages/SelectResource';

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
    }
    else if (loginInfo && !loginInfo.success) {
        return (
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<SignIn />} />  {/* Catch-all route */}
                </Routes>
            </Router>
        );
    }
    else {
        return (
            <Router>
                <Routes>
                    {/* Routes using FullLayout */}
                    <Route element={<FullLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<PendingOrders />} />
                        {/* Nested layout for orders routes */}
                        <Route path="/orders">
                            <Route path="traintrip" element={<TrainTrips />} />
                            <Route path="roadways" element={<Roadways />} />
                            <Route path="resource" element={<SelectResource />} />
                        </Route>
                    </Route >

                    {/* Routes without FullLayout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
                </Routes>
            </Router>
        );
    }
}