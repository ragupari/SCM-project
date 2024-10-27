import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DriverSchedule from './pages/DriverSchedule';
import AssistantSchedule from './pages/AssistantSchedule';
import DestinationsPage from './pages/DestinationsPage';
import ProfilePage from './pages/profilepage';
import BottomNav from './components/BottomNavigation';
import Box from '@mui/material/Box';

// Create a theme for consistent styling
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const App = () => {
  const [user, setUser] = useState(null);

  // Save user data to localStorage on login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
  };

  // Clear user data from localStorage on logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data
  };

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user
    }
  }, []); // Run only once on component mount

  // Protected route logic
  const ProtectedRoute = ({ children }) =>
    !user ? <Navigate to="/login" replace /> : children;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              !user ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {user?.role === 'driver' ? (
                  <DriverSchedule user={user} onLogout={handleLogout} />
                ) : (
                  <AssistantSchedule user={user} onLogout={handleLogout} />
                )}
              </ProtectedRoute>
            }
          />

          {/* Destinations Route */}
          <Route
            path="/destinations/:scheduleId"
            element={
              <ProtectedRoute>
                <DestinationsPage user={user} />
              </ProtectedRoute>
            }
          />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Bottom Navigation */}
        {user && (
          <Box sx={{ pb: 7 }}>
            <BottomNav />
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
