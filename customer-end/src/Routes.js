import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';
import { useState, useEffect } from 'react';
import login from './Login';
import Profile from './pages/Profile';

export default function AppRoutes() {
    const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    async function fetchLoginInfo() {
      const info = await login();
      setLoginInfo(info);
    }
    fetchLoginInfo();
  }, []);
  if (!loginInfo){
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
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<SignIn/>} />  {/* Catch-all route */}
                </Routes>
            </Router>);
  }
  else{
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home user={loginInfo.username} />} />
                <Route path="/" element={<Home user={loginInfo.username}/>} />      
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
            </Routes>
        </Router>
    );}

}
