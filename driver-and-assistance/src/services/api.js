const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000/api';

export const login = async (role, id) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role, id }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  
  return response.json();
};

export const getSchedule = async (role, id) => {
  const response = await fetch(`${API_BASE_URL}/schedule/${role}/${id}/schedule`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch schedule');
  }
  
  return response.json();
};

export const getDestinations = async (scheduleId) => {
  const response = await fetch(`${API_BASE_URL}/schedule/destinations/${scheduleId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch destinations');
  }
  
  return response.json();
};

// services/api.js
export const getDriverProfile = async (driverId, role) => {
  // const response = await fetch(`/api/profile/driver/${driverId}/profile`);
  const path = role === 'driver' ? `${API_BASE_URL}/profile/driver/${driverId}/profile` : `${API_BASE_URL}/profile/assistant/${driverId}/profile`;

  const response = await fetch(path);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};
